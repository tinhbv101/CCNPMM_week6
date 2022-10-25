const {initialBlog} = require('../public/javascripts/initialBlog')

const addComment = (req, res) => {
    console.log("add comment");
    const idBlog = req.params.idBlog
    console.log("add comment ", idBlog);
    const data = initialBlog.filter(b => b.id === Number(idBlog))[0];
    console.log(data);
    const dataComment = {
        id: data.comments.length + 1,
        content: req.body.content
    }
    console.log(dataComment); 
    data.comments.push(dataComment)
    res.send(initialBlog)
}

const updateComment = (req, res) => {
    const idBlog =  Number(req.params.idBlog);
    const idComment =  Number(req.params.idComment);
    const contentComment = req.body.content;
    console.log("contentComment: ",contentComment);
    const dataComment = {
        id: idComment,
        content: contentComment
    }
    console.log("dataComment: ",dataComment);
    var blog = initialBlog[idBlog-1];
    var comments = blog.comments;
    comments[idComment-1] =dataComment
    console.log("comments: ",comments);
    blog.comments
    res.send(initialBlog)
}

const deleteComment =  (req, res) => {
    const idBlog =  req.params.idBlog;
    const idComment =  req.params.idComment;
    
    const data = initialBlog.filter(b => b.id === Number(idBlog))[0];
    console.log("delete: ", data);
    const comments = data.comments.filter(c => c.id !== Number(idComment));
    const newData = {
        ...data,
        comments: comments
    }
    initialBlog[idBlog-1] = newData
    console.log("new data delete: ", newData);
    console.log("new data delete: ", initialBlog);
    res.send(initialBlog)
}


module.exports = {
    addComment,
    updateComment,
    deleteComment
}