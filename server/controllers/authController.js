const nodemailer = require("nodemailer");

//? Error Handlers
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");

//? Validators
const { registerValidator } = require("../middlewares/validators/joiValidator");

//?Models
const User = require("../models/userModel");
const School = require("../models/schoolModel.js");

//? jwt
const { createGeneralJWT, verifyToken } = require("../utils/jwt");

//! REGISTER SCHOOL-USER
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  console.log("============ REGISTER USER REQUEST BODY============");
  if (req.body.studentGuardian) {
    req.body.studentGuardian = JSON.parse(req.body.studentGuardian);
  }
  console.log(req.body);

  const { email } = req.body;

  //* ===================================================check if user already exist
  await User.findOne({ email }).exec((err, user) => {
    if (err) {
      //!END OF THIS FUNC
      console.log(err);
      return next(new ErrorHandler("Server Error, Try Again Later", 500));
    }
    if (user) {
      //!END OF THIS FUNC
      return next(new ErrorHandler("User already exists", 400));
    }
  });

  const schoolData = await School.findById({
    _id: req.headers["x-school-id"],
  }).exec();

  if (!schoolData) {
    return next(new ErrorHandler("School not found", 404));
  }

  let fileName = null;
  const schoolUniqueId = schoolData.schoolUniqueId;
  // if req.file is not undefined then upload file to server
  if (req.file) {
    console.log("File is present, proceeding with upload operations");
    // use original file extension as it is
    fileName = `${Date.now()}.${req.file.originalname.split(".")[1]}`;
    await addFile(req.headers["x-school-unique-id"], fileName, req.file.buffer)
      .then((filePath) => {
        console.log(`File ${fileName} added at path: ${filePath}`);
        // Handle success
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        // Handle error
        return next(new ErrorHandler("Error uploading file", 400));
      });
  }

  //  todo: --------------------------->  Assign the ObjectId of the school

  const newUser = new User(req.body);
  newUser.school = req.headers["x-school-id"];
  newUser.image = fileName;

  await newUser.save((err, success) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Error occured while saving user to db", 500));
    }
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: success,
    });
  });
});

//! GET SINGLE SCHOOL-USER WITH POPULATED SCHOOL DATA
exports.getUserProfileData = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  console.log("userId =============================================================");
  console.log(id);
  await User.findById(id)
    .select("-salt -hashed_password")
    .populate("school")
    .exec((error, user) => {
      if (error) {
        return next(new ErrorHandler("server error", 500));
      }
      if (!user) {
        return next(new ErrorHandler("user not found", 400));
      }
      return res.status(200).json({
        success: true,
        message: "User profile data fetched successfully",
        data: user,
      });
    });
});

//! GET ALL SCHOOL USER OF PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllSchoolUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const users = await User.find({ school: School_Id }).select("-salt -hashed_password").populate("school").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL DRIVER USER with role "driver" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllDriverUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const users = await User.find({ school: School_Id, role: "driver" }).populate("school").populate("vehicleNumber").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL Student USER with role "student" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllStudentUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const users = await User.find({ school: School_Id, role: "student" }).populate("school").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL Canteen USER with role "canteen staff" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllCanteenUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const users = await User.find({ school: School_Id, role: "canteen staff" }).populate("school").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL Librarian USER with role "librarian" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllLibrarianUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  //! HEADERS
  const School_Id = req.headers["x-school-id"];
  //! HEADERS

  const users = await User.find({ school: School_Id, role: "librarian" }).populate("school").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL SCHOOL-USER OF ALL SCHOOL  WITH POPULATED SCHOOL DATA
exports.getAllSchoolUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({}).select("-salt -hashed_password").populate("school").exec();

  if (!users) {
    return next(new ErrorHandler("No users found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

exports.verifiedRegisterUser = catchAsyncErrors(async (req, res, next) => {
  //*=============================================validate body data using
  //todo: JoiValidator , it will throw auto generated error as response
  const { name, email, password } = req.body;
  //specifically sending selected form data to joi, as joi will response as error if extra fields are provided in req.body
  const formDataForValidation = {
    email: email,
    name: name,
    password: password,
  };
  await registerValidator(formDataForValidation);

  //* ===================================================check if user already exist
  await User.findOne({ email }).exec((err, user) => {
    if (err) {
      //!END OF THIS FUNC
      return next(new ErrorHandler("Server Error, Try Again Later", 500));
    }
    if (user) {
      //!END OF THIS FUNC
      return next(new ErrorHandler("User already exists", 400));
    }
  });

  //*============================================================ If user dont exist,
  //todo: send verification email with dynamic frontend link with user-data-that-need-to-be-created inside jsonwebtoken
  //todo: in gmail use will receive == localhost:3000/verify-email-for-creating-account/{TokenHavingUserAccountDataToBeCreated}
  //localhost:3000/verify-email-for-creating-account/:id/:token
  //on clicking verify, the client fetch token from url
  //and send to server at server's endpoint /api/create-user-account-after-verifying-jwt/:id  inside header Bearer token to verify
  //the server will verity that token , then fetch user-account-data and create account with that data

  const generatedToken = await createGeneralJWT({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, "1d");

  const activationLink = `${process.env.PROD_CLIENT_URL}/activate-account/${generatedToken}`;

  var from = "donotreplythisback@gmail.com";
  var to = email;
  var subject = "Verification";
  var message = activationLink;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "donotreplythisback@gmail.com",
      pass: "sajjhjleycfzonhx",
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return next(new ErrorHandler("Error occured while sending email", 500));
    } else {
      console.log("email sent :  " + info.response);
      return res.status(200).json({
        success: true,
        message: "Verification email sent successfully",
      });
    }
  });

  // const emailSentStatus = await sendEmail(email, process.env.EMAIL_FROM, emailContent);
  // console.log(emailSentStatus);
  // if (emailSentStatus) {
  //   return res.status(200).json({
  //     success: true,
  //     message: "Verification email sent successfully",
  //   });
  // } else {
  //   return next(new ErrorHandler("Error occured while sending email", 500));
  // }
});

exports.createAccountForEmailVerifiedUser = catchAsyncErrors(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  console.log(req.header);
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1]; //? token is in form of Bearer token
    const tokenData = await verifyToken(token, process.env.JWT_ACCOUNT_ACTIVATION);
    console.log(tokenData);

    if (!tokenData) {
      return next(new ErrorHandler("No token provided", 401));
    }

    const { name, email, password } = tokenData.data;
    console.log(name);
    console.log(email);
    console.log(password);

    await User.findOne({ email }).exec((err, user) => {
      if (err) {
        //!END OF THIS FUNC
        return next(new ErrorHandler("Server Error, Try Again Later", 500));
      }
      if (user) {
        //!END OF THIS FUNC
        return next(new ErrorHandler("User already exists", 400));
      }
    });

    const newUser = new User({ name, email, password });
    await newUser.save((err, success) => {
      if (err) {
        return next(new ErrorHandler("Error occured while saving user to db", 500));
      }
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: success,
      });
    });
  } else {
    return next(new ErrorHandler("No token provided", 401));
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  await User.findOne({ email }).exec(async (err, user) => {
    if (err) {
      return next(new ErrorHandler("server error", 400));
    }
    if (!user) {
      return next(new ErrorHandler("user not found", 400));
    }
    //? if model method returns false then execute below block
    if (!user.compareWithEncryptedPassword(password)) {
      return next(new ErrorHandler("password or email is incorrect", 400));
    }

    const { _id, name, email, role, school, image } = user;
    console.log(user);

    // find schoolUniqueId from school model
    const schoolData = await School.findById({
      _id: school,
    }).exec();

    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    const schoolUniqueId = schoolData.schoolUniqueId;

    const schoolName = schoolData.school_name;
    const schoolImage = schoolData.image;
    const schoolStreet = schoolData.street;

    const generatedToken = await createGeneralJWT({ schoolName, schoolImage, schoolStreet, userId: _id, name, email, role, schoolId: school, schoolUniqueId, image }, process.env.JWT_SECRET_KEY, "1d");

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        userId: _id,
        image,
        name,
        email,
        role,
        schoolId: school,
        schoolUniqueId,
        schoolName,
        schoolImage,
        schoolStreet,
      },
      token: generatedToken,
    });
  });
});

//! DELETE SchoolUser CONTROLLER

exports.deleteSchoolUserController = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  //! HEADERS
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS

  console.log(userId);

  try {
    const existingUser = await User.findById({
      _id: userId,
    }).exec();

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete the associated image file, if it exists
    const fileName = existingUser.image;
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
    await existingUser.remove();

    return res.status(200).json({
      success: true,
      message: "User has been deleted successfully!",
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

//! Update SchoolUser Controller

exports.updateSchoolUserController = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  //! HEADERS
  const School_Folder_Name = req.headers["x-school-unique-id"];
  //! HEADERS

  try {
    const existingUser = await User.findById(userId).exec();

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let fileName = existingUser.image;
    if (req.file) {
      if (fileName) {
        await deleteFile(School_Folder_Name, fileName)
          .then(() => {
            console.log(`Deleted old file: ${fileName}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
          });
      }

      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.png`;
      await addFile(School_Folder_Name, fileName, req.file.buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
          return next(new ErrorHandler("Error uploading file", 500));
        });
    }

    existingUser.set(req.body);
    existingUser.image = fileName;

    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "User has been updated successfully!",
      data: existingUser,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});
