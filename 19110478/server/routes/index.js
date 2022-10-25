var express = require('express');
var router = express.Router();
const {getAllBlogs, addBlog} = require('../controllers/blogController')
/* GET home page. */
router.get('/', getAllBlogs)

module.exports = router;
