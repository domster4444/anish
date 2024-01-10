//? Error Handlers
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//?Models
const School = require("../models/schoolModel.js");

// ? file manipulation utils
const { addFile, deleteFile } = require("../utils/fileManipulation.js");

//? jwt
const { createGeneralJWT, verifyToken } = require("../utils/jwt");

// ? for pdf
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

//! REGISTER SCHOOL CONTROLLER
exports.registerSchoolController = catchAsyncErrors(async (req, res, next) => {
  const { schoolUniqueId, account_status, school_name, school_package, school_package_renewal_date, school_email, password, school_phone, school_location, school_type, principal_name, contact_email, contact_phone, website, street, city, state, postal_code } = req.body;
  try {
    const existingUser = await School.findOne({ school_email }).exec();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "School with that email already exists. Try another email.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }

  let fileName = null;
  // if req.file is not undefined then upload file to server
  if (req.file) {
    console.log("File is present, proceeding with upload operations");
    fileName = `${Date.now()}.png`;
    await addFile(schoolUniqueId, fileName, req.file.buffer)
      .then((filePath) => {
        console.log(`File ${fileName} added at path: ${filePath}`);
        // Handle success
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        // Handle error
      });
  }
  const newSchool = new School({
    schoolUniqueId,
    account_status,
    school_name,
    school_package,
    school_package_renewal_date,
    school_email,
    password,
    school_phone,
    school_location,
    school_type,
    principal_name,
    contact_email,
    contact_phone,
    website,
    image: fileName,
    street,
    city,
    state,
    postal_code,
  });
  await newSchool.save((err, success) => {
    if (err) {
      console.log(err.message);
      return next(new ErrorHandler("Error occured while creating school", 500));
    }
    return res.status(201).json({
      success: true,
      message: "School has been created successfully!",
      data: success,
    });
  });
});

//! LOGIN SCHOOL CONTROLLER
exports.loginSchoolController = catchAsyncErrors(async (req, res, next) => {
  const { school_email, password } = req.body;

  console.log(school_email, password);
  await School.findOne({ school_email }).exec(async (err, user) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Server error has occured",
      });
      return next(new ErrorHandler("Server error has occured", 400));
    }
    if (!user) {
      res.status(400).json({
        success: false,
        message: "School not found associated with that email.",
      });
      return next(new ErrorHandler("School not found associated with that email.", 400));
    }
    //? if model method returns false then execute below block
    if (!user.compareWithEncryptedPassword(password)) {
      res.status(400).json({
        success: false,
        message: "password or email is incorrect",
      });

      return next(new ErrorHandler("password or email is incorrect", 400));
    }

    const { _id, school_name, school_email, schoolId, school_package, account_status, school_package_renewal_date, schoolUniqueId, role, image, street } = user;

    console.log(user);
    const generatedToken = await createGeneralJWT({ _id, school_name, school_email, schoolId, school_package, account_status, school_package_renewal_date, schoolUniqueId, role, image }, process.env.JWT_SECRET_KEY, "1d");

    res.status(200).json({
      success: true,
      message: "School logged in successfully",
      data: {
        _id,
        school_email,
        schoolId: _id,
        school_package,
        account_status,
        school_package_renewal_date,
        schoolUniqueId,
        role,
        image,
        name: school_name,
        street,
      },
      token: generatedToken,
    });
  });
});

//! UPDATE SCHOOL CONTROLLER
exports.updateSchoolController = catchAsyncErrors(async (req, res, next) => {
  const schoolId = req.params.id; // Assuming you have a parameter for the school ID
  const updateData = req.body;

  try {
    // Check if the school exists
    const existingSchool = await School.findById(schoolId).exec();

    if (!existingSchool) {
      return res.status(404).json({
        success: false,
        message: "School not found.",
      });
    }

    const schoolFolderNameFromDb = existingSchool.schoolUniqueId;

    // Handle file upload if a new file is provided
    let fileName = existingSchool.image;
    if (req.file) {
      // Delete the old file, if it exists
      if (fileName) {
        await deleteFile(schoolFolderNameFromDb, fileName)
          .then(() => {
            console.log(`Deleted old file: ${fileName}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
          });
      }

      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.png`;
      await addFile(schoolFolderNameFromDb, fileName, req.file.buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
          // Handle error
          return next(new ErrorHandler("Error uploading file", 500));
        });
    }

    // Update school information
    existingSchool.set(updateData);
    existingSchool.image = fileName;

    await existingSchool.save();

    return res.status(200).json({
      success: true,
      message: "School has been updated successfully!",
      data: existingSchool,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});

//! DELETE SCHOOL CONTROLLER

exports.deleteSchoolController = catchAsyncErrors(async (req, res, next) => {
  const schoolId = req.params.id;

  //! HEADERS
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS
  try {
    const existingSchool = await School.findById(schoolId).exec();

    if (!existingSchool) {
      return res.status(404).json({
        success: false,
        message: "School not found.",
      });
    }

    // Delete the associated image file, if it exists
    const fileName = existingSchool.image;
    if (fileName) {
      await deleteFile(School_Folder_Name, fileName)
        .then(() => {
          console.log(`Deleted old file: ${fileName}`);
        })
        .catch((error) => {
          console.error(`Error deleting old file: ${error}`);
        });
    }

    // Remove the school from the database
    await existingSchool.remove();

    return res.status(200).json({
      success: true,
      message: "School has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});

//! SCHOOL GET PROFILE CONTROLLER
exports.getSchoolProfileController = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  await School.findById(id)
    .select("-salt -hashed_password")
    .exec((error, user) => {
      if (error) {
        return next(new ErrorHandler("Server error occured.", 500));
      }
      if (!user) {
        return next(new ErrorHandler("User data not found", 400));
      }
      return res.status(200).json({
        success: true,
        message: "User profile fetched successfully!",
        data: user,
      });
    });
});

//! GET All Schools

exports.getAllSchoolsController = catchAsyncErrors(async (req, res, next) => {
  await School.find({})
    .select("-salt -hashed_password")
    .exec((error, users) => {
      if (error) {
        return next(new ErrorHandler("Server error occured.", 500));
      }
      if (!users) {
        return next(new ErrorHandler("User data not found", 400));
      }
      return res.status(200).json({
        success: true,
        message: "User profile fetched successfully!",
        data: users,
      });
    });
});
