const express = require("express");
const router = express.Router();
const { handlelongurl, handleredirect } = require("../controller/url");



router.route('/')
.post(handlelongurl);


router.route('/:shortid')
.get(handleredirect);



module.exports = router;