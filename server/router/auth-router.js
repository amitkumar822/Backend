const express = require("express");
const router = express.Router();
// const { home, register } = require('../controllers/auth-countroller')
const authcontroller = require("../controllers/auth-countroller");
const signupSchema = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middlewares");

// router.route('/').get(home)
// router.route('/register').get(register)

router.route("/").get(authcontroller.home);
router.route("/register").post(validate(signupSchema), authcontroller.register);
router.route("/login").post(authcontroller.login);

module.exports = router;
