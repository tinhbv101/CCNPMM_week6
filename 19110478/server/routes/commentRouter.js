const express = require('express')
const router = express.Router()
const {addComment,updateComment, deleteComment} = require('../controllers/commentController')

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

// router.get('/all', getAllBlogs)
router.post('/add/:idBlog', addComment)
router.put('/update/:idBlog/:idComment', updateComment)
router.delete('/delete/:idBlog/:idComment',deleteComment)

module.exports = router