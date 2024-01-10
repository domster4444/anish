// userModal.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const schoolSchema = new Schema({
  //! MAKE SURE TO UPDATE WITH DIGITAL SIGNATURE of principal
  principal_signature: {
    type: String,
  },

  schoolUniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  school_email: {
    type: String,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    trim: true,
    // lowercase:true,
    // unique:true,
    maxlength: [50, "password cant be more than 50 characters"],
  },
  role: {
    type: String,
    default: "school-account",
  },
  school_name: {
    type: String,
    required: true,
  },
  school_package: {
    type: String,
    enum: ["standard", "ultimate", "premium"],
    required: true,
    default: "standard",
  },
  account_status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  school_package_renewal_date: {
    type: String,
    required: true,
  },

  school_phone: {
    type: String,
    required: true,
  },

  school_location: {
    type: String,
    required: true,
  },
  school_type: {
    type: String,
    enum: ["public", "private"],
    required: true,
  },
  principal_name: {
    type: String,
    required: true,
  },
  contact_email: {
    type: String,
    required: true,
  },
  contact_phone: {
    type: String,
  },
  website: {
    type: String,
  },
  image: {
    type: String,
  },

  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },

  salt: String, //? it tells us how strong the password is hashed.
});

//! ==============================   VIRTUAL METHODS =================================
//todo: virtual field, that take password in string format and hash it and send db as hashed_password property.
schoolSchema
  .virtual("password") // this virtual method is going to take the "password"
  .set(function (password) {
    console.log(password);

    // now after this virtual method takes "password", we going to use set function that will hash that "password" that we got and then save in database with field name "hashed_password"
    this._password = password;
    //? salt is present in the schema.
    // => sets the salt field  in schoolSchema with the value returned from makeSalt method
    this.salt = this.makeSalt();
    //? hashed_password is present in the schema.
    // => sets the hashed_password field  in schoolSchema with the value returned from encryptPassword method
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password; //? this is going to return the "password" in text format
  });

//! ==============================   METHODS =================================
schoolSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  encryptPassword: function (password) {
    // if not password then our encrypt method will return empty string
    if (!password) {
      return "";
    }
    // this is going to return the hashed password
    try {
      //@ts-ignore
      return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
    } catch (err) {
      // if error occurs while hashing password, it will return empty string
      return "";
    }
  },

  compareWithEncryptedPassword: function (planeTextPassword) {
    return this.encryptPassword(planeTextPassword) === this.hashed_password; //? Will return true or false
  },
};

const School = mongoose.model("School", schoolSchema);

module.exports = School;

//   teachers: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Teacher",
//     },
//   ],
//   students: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Student",
//     },
//   ],
//   parents: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Parent",
//     },
//   ],

// Academic Departments
//   departments: [
//     {
//       department_name: String,
//       department_head: {
//         type: Schema.Types.ObjectId,
//         ref: "Teacher",
//       },
//     },
//   ],
// Courses offered
//   courses: [
//     {
//       course_name: String,
//       department: {
//         type: Schema.Types.ObjectId,
//         ref: "Department",
//       },
//     },
//   ],
// Academic Calendar, Terms, and Important Dates
//   academic_calendar: [
//     {
//       term_name: String,
//       start_date: Date,
//       end_date: Date,
//       holidays: [Date],
//     },
//   ],
// Events and Announcements
//   events: [
//     {
//       event_name: String,
//       event_date: Date,
//       description: String,
//     },
//   ],
