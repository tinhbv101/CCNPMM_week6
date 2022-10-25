const express = require('express')
const router = express.Router()
const {getAllBlogs, addBlog,deleteBlog, updateBlog} = require('../controllers/blogController')

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/all', getAllBlogs)
router.post('/add', addBlog)
router.put('/update/:id',updateBlog)
router.delete('/delete/:id', deleteBlog)

module.exports = router