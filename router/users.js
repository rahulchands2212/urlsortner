const express = require("express");
const router = express.Router();
const { handlelongurl, handleredirect } = require("../controller/user");



router.route('/urls')
.post(handlelongurl);

router.route('/:shortid')
.get(handleredirect);



module.exports = router;