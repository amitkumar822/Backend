const express = require("express");

const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-midddleware");
const {
  signupSchema,
  loginSchema,
} = require("../validators/validate-validator");

router.route("/").get(authcontroller.home);
router
  .route("/register")
  .post(validate(signupSchema), authcontroller.registration);
router.route("/login").post(validate(loginSchema), authcontroller.login);

module.exports = router;
