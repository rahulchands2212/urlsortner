const express = require("express");
const { handlehome, handlesignup, handlelogin } = require("../controller/url");
const router = express.Router();

router.route("/")
.get(handlehome);

router.get("/signup",handlesignup);
router.get("/login",handlelogin);

module.exports = router;