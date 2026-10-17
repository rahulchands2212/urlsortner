const express = require("express");
const { handlehome, handlesignup, handlelogin, adminUrl } = require("../controller/url");
const { restritto } = require("../middleware/auth")
const router = express.Router();

router.route("/")
.get(restritto(["NORMAL","ADMIN"]),handlehome);

router.get("/ADMIN/urls",restritto(["ADMIN"]),adminUrl);

router.get("/signup",handlesignup);
router.get("/login",handlelogin);

module.exports = router;