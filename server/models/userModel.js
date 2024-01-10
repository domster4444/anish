//? types import

const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "parent", "librarian", "accountant", "registrar", "class representative", "examination officer", "driver", "canteen staff"],
      required: true,
    },
    image: {
      type: String,
    },
    education: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [50, "Name can not be more than 50 characters"],
      minlength: [3, "Name must be at least 3 characters"],
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Please add an email"],
    },
    gender: {
      type: String,
      default: "male",
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },

    canteenDepositedAmount: {
      type: String,
      default: 0,
    },

    // TODO:  Student role extra fields starts here ->
    studentBatch: {
      type: String,
    },

    currentRollNo: {
      type: String,
    },

    studentSection: {
      type: String,
    },

    isStudentUseHostel: {
      type: String,
    },

    studentDateOfBirth: {
      type: String,
    },
    studentEnrollmentDate: {
      type: String,
      default: Date.now,
    },
    currentClass: {
      type: String,
    },
    //! NEW NEED TO BE ADDED IN CONTROLLER AND ALL
    studentCurrentSection: {
      type: String,
    },
    enrolledClassDate: {
      type: String,
    },
    permanentStudentAddress: {
      type: String,
    },
    studentPreviousSchoolName: {
      type: String,
    },
    studentPreviousSchoolAddress: {
      type: String,
    },
    studentPassedYear: {
      type: String,
    },
    studentGPA: {
      type: String,
    },
    studentContact: {
      type: String,
    },
    studentCurrentAddress: {
      type: String,
    },
    studentGuardian: [
      {
        guardianName: {
          type: String,
        },
        guardianContact: {
          type: String,
        },
        guardianAddress: {
          type: String,
        },
        guardianOccupation: {
          type: String,
        },
        guardianPaymentAmount: {
          type: String,
        },
        guardianPaymentMethod: {
          type: String,
        },
        isLocalGuardian: {
          type: Boolean,
        },
        guardianYearlyIncome: {
          type: String,
        },
        guardianRelation: {
          type: String,
        },
      },
    ],

    // TODO: Driver role extra fields starts here ->
    // image (already present)
    // name (already present)
    // address (already present)
    // education (already present)
    // phoneNumber (already present)
    vehicleNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    licenseNumber: {
      type: String,
    },
    driverType: {
      type: String,
      enum: ["own employee", "contract base"],
    },

    // TODO: Teacher role extra fields starts here ->

    // phoneNumber (already present)
    // address (already present)
    teacherDateOfBirth: {
      type: String,
    },
    teacherQualification: {
      type: String,
    },
    teacherNoOfExperience: {
      type: String,
    },
    teacherJoiningDate: {
      type: String,
    },
    teacherContractType: {
      type: String,
      enum: ["permanent", "temporary"],
    },
    // TODO: Teacher role extra fields ends here ->
    // teacherAssignedClass: {
    //   type: String,
    // },
    // teacherAssignedSection: {
    //   type: String,
    // },
    // teacherAssignedSubject:[
    //   {
    //     subjectName:{
    //       type:String
    //     },
    // ],

    hashed_password: {
      type: String,
      trim: true,
      maxlength: [50, "password cant be more than 50 characters"],
      minlength: [3, "password must be at least 3 characters"],
      required: [true, "please add a password"],
    },

    salt: String,

    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

// virtual field:-
// T - type
// T - trim
// R - required
// L - lowercase
// U - unique
// MAX - maxlength
// MIN - minlength
// ENUM  - enum
// DEFAUlt - default (if you type default then required is not necessary)

//todo: virtual field, that take password in string format and hash it and send db as hashed_password property.
userSchema
  .virtual("password") // this virtual method is going to take the "password"
  .set(function (password) {
    // now after this virtual method takes "password", we going to use set function that will hash that "password" that we got and then save in database with field name "hashed_password"
    this._password = password;
    //? salt is present in the schema.
    // => sets the salt field  in userSchema with the value returned from makeSalt method
    this.salt = this.makeSalt();
    //? hashed_password is present in the schema.
    // => sets the hashed_password field  in userSchema with the value returned from encryptPassword method
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password; //? this is going to return the "password" in text format
  });

userSchema.methods = {
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

const User = mongoose.model("SchoolUser", userSchema);

module.exports = User;
