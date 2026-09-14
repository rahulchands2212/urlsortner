const express = require("express");
const { handlehome } = require("../controller/user");
const router = express.Router();

router.route("/")
.get(handlehome);

module.exports = router;