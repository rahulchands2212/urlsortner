const express = require("express");
const router = express.Router();

const { handlecreateuser, handlelogin } = require("../controller/user");

router.post("/signup",handlecreateuser);
router.post("/login",handlelogin);

module.exports = router;