const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const blogsRouter = require('./routes/blogsRouter')
const commentRouter = require('./routes/commentRouter')
var cors = require("cors");

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(express.json()) 
app.use(cors());
app.use("/blog", blogsRouter)
app.use("/comment", commentRouter)
// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11