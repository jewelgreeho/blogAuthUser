const express = require('express');
const router = express.Router()
const {
    fileUpload
} = require("../controllers/fileUpload");


//below post route url
router.route('/login').post(fileUpload);




module.exports = router;