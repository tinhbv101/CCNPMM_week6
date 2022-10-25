import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import CreatePost from './components/createPost';
import {Flex} from '@chakra-ui/react'
import Posts from './components/post';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [blogs, setBlogs] = useState([])
  const [isReload, setIsReload] = useState(false)
  
  const addBlogs = (title, content) => {
    axios.post("http://localhost:5000/blog/add", {
      title: title,
      content: content
    }).then(res => {
        if (res.status === 200) {
            setIsReload(true)
        }
    })
  }
  const updateBlog = (id,title, content) => {
    axios.put(`http://localhost:5000/blog/update/${id}`, {
      title: title,
      content: content
    }).then(res => {
        if (res.status === 200) {
            setIsReload(true)
        }
    })
  }
  const getBlog = () => {
    axios.get("http://localhost:5000/blog/all")
    .then(res => {
      console.log(res.data);
      setBlogs(res.data)
    })
    .catch(err => console.log(err))
    setIsReload(false)
  }
  const deleteBlog = (id) => {
    axios.delete(`http://localhost:5000/blog/delete/${id}`)
    .then(res => {
      if (res.status === 200) {
          setIsReload(true)
      }
  })
  }

  useEffect(() => {
    getBlog()
  }, [isReload])
  return (
    <>
      <Header />
      <CreatePost addBlog={addBlogs}/>
      <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      >
        {
          blogs.map(blog => {
            return <Posts key={blog.id} id={blog.id} title={blog.title} content={blog.content} comments={blog.comments} 
            setIsReload={setIsReload} updatePost={updateBlog} deleteBlog={deleteBlog}/>
          })
        }
      </Flex>
    </>
  );
}

export default App;
