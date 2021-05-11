const express = require("express");

const {check} = require("express-validator")
const {signin,signup} = require("../controller/auth")

const router = express.Router();


router.post("/signin",
[
    check("email","Please provide valid email").isEmail(),

    check("password","Password should be minimum 8 character").isLength({min:8})
],
signin
);

router.post("/signup",
[
    check("email","Please provide valid email").isEmail(),

    check("password","Password should be minimum 8 character").isLength({min:8})
],
signup
);


module.exports = router
