const express = require("express");
const router = express.Router();
const { handlelongurl, handleredirect, handledisplayallurl } = require("../controller/user");

router.route('/allurl')
.get(handledisplayallurl);

router.route('/')
.post(handlelongurl);

router.route('/:shortid')
.get(handleredirect);



module.exports = router;