const express = require("express");

const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const {
  signupSchema,
  loginSchema,
} = require("../validators/validate-validator");
const validate = require("../middlewares/validate-middleware");

router
  .route("/register")
  .post(validate(signupSchema), authcontroller.registration);
router.route("/login").post(validate(loginSchema), authcontroller.login);

module.exports = router;
