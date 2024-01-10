const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { registerValidator, loginValidator } = require("../middlewares/validators/testValidator");
const {
  registerUser,
  getAllSchoolUsers,
  getAllSchoolUsersOfParticularSchool,
  updateSchoolUserController,
  deleteSchoolUserController,
  verifiedRegisterUser,
  createAccountForEmailVerifiedUser,
  loginUser,
  getUserProfileData,
  getAllDriverUsersOfParticularSchool,
  getAllLibrarianUsersOfParticularSchool,
  getAllCanteenUsersOfParticularSchool,
  getAllStudentUsersOfParticularSchool,
} = require("../controllers/authController");

const isUserLoggedInProd = require("../middlewares/isUserLoggedInProd");
const isUserAdminProd = require("../middlewares/isUserAdminProd");
const isUserCustomerProd = require("../middlewares/isUserCustomerProd");

router.route("/register").post(upload.single("image"), registerValidator, registerUser);
router.route("/login").post(upload.none(), loginValidator, loginUser);
router.route("/profile/:id").get(getUserProfileData);
router.route("/get-all-school-users-of-particular-school").post(upload.none(), getAllSchoolUsersOfParticularSchool);
router.route("/get-all-school-driver-of-particular-school").post(upload.none(), getAllDriverUsersOfParticularSchool);
router.route("/get-all-school-librarian-of-particular-school").post(upload.none(), getAllLibrarianUsersOfParticularSchool);
router.route("/get-all-school-canteen-user-of-particular-school").post(upload.none(), getAllCanteenUsersOfParticularSchool);
router.route("/all-school-user").get(getAllSchoolUsers);
router.route("/get-all-school-student-of-particular-school").post(upload.none(), getAllStudentUsersOfParticularSchool);

router.route("/delete-user/:id").delete(upload.none(), deleteSchoolUserController);
router.route("/update-user/:id").patch(upload.single("image"), updateSchoolUserController);
// router.route("/verified-register").post(registerValidator, verifiedRegisterUser);
// router.route("/create-account-for-email-verified").post(createAccountForEmailVerifiedUser);

module.exports = router;
