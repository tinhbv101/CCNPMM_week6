const {initialBlog} = require('../public/javascripts/initialBlog')

const getAllBlogs = (req, res) => {
    console.log("get all")
    res.send(initialBlog)
}

const addBlog = (req, res) => {
    console.log("add blog");
    console.log(req.body);
    const data = {
        id: initialBlog.length + 1,
        title: req.body.title,
        content: req.body.content,
        comments: []
    }
    initialBlog.push(data)
    res.send(initialBlog)
}

const updateBlog = (req, res) => {
    console.log("add blog");
    const id = req.params.id
    console.log(id);
    console.log(req.body);
    let data = initialBlog.filter(b => b.id === Number(id))[0]
    data = {
        id: data.id,
        title: req.body.title,
        content: req.body.content,
        comments: data.comments
    }
    initialBlog[id-1] = data
    
    console.log(initialBlog);
    res.send(initialBlog)
}

const deleteBlog = (req, res) => {
    console.log("delete blog");
    const id = req.params.id
    console.log("delete blog ", id);
    const index = initialBlog.findIndex(data => data.id === Number(id))
    initialBlog.splice(index, 1)
    res.send(initialBlog)
}
module.exports = {
    getAllBlogs,
    addBlog,
    updateBlog,
    deleteBlog
}