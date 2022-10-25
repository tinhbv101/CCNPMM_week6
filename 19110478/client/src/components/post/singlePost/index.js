import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {Flex, Button, Image,Textarea, Box, Text } from '@chakra-ui/react'
import axios from 'axios';

SinglePost.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    setIsReload: PropTypes.func,
    updatePost: PropTypes.func,
    deleteBlog: PropTypes.func,
};

function SinglePost(props) {
    const {id, title, content, setIsReload, updatePost,deleteBlog} = props

    const addComment = (idBlog, content) => {
        axios.post(`http://localhost:5000/comment/add/${idBlog}`, {
            content: content
        }).then(res => {
            if (res.status === 200) {
                setIsReload(true)
            }
        })
    }
    
    const [currTitle, setCurrTitle] = useState(title)
    const [currContent, setCurrContent] = useState(content)
    const [currContentComment, setCurrContentComment] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)

    const commentRef = useRef();
    const currentRef = useRef();
    const editPostRef = useRef();

    const editPostOnClick = () => {
        if (!isUpdate) {
            currentRef.current.style.display = "none"
            editPostRef.current.style.display = "block"
            setIsUpdate(true)
        } else {
            setIsReload(true)
            updatePost(id, currTitle, currContent)
            currentRef.current.style.display = "block"
            editPostRef.current.style.display = "none"
            setIsUpdate(false)
        }
    }
    const deleteOnClick = () => {
        deleteBlog(id)
    }

    const addCommentOnClick = () => {
      commentRef.current.style.display = "block"
    }

    useEffect(() => {
        
    }, [isUpdate])
    return (
        <Flex
        alignItems="center"
        justifyContent = "center"
        >
            <Flex
            maxWidth= "600px"
            h="100%"
            alignItems="center"
            justifyContent = "center"
            boxShadow= "2px 2px 2px"
            border="1px solid #fefefe" 
            padding="20px" 
            backgroundColor="#e9f5f9"
            borderRadius="16px"
            position="relative"
            >
                <Image
                borderRadius='100%'
                boxSize='50px'
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
                />
                <Box
                >    
                    <Box ref={currentRef}>
                        <Text  
                        margin='6px'
                        display="block"
                        backgroundColor="#bee0ec"
                        borderRadius= "10px"
                        w="300px"
                        padding="6px"
                        marginLeft ="20px"
                        h="20px"
                        _focusVisible={{
                            outline: "none"
                        }}
                        border="none"
                        placeholder='Tiêu đề' >
                            {currTitle}
                        </Text>

                        <Text  
                        margin='6px'
                        display="block"
                        backgroundColor="#bee0ec"
                        borderRadius= "10px"
                        w="300px"
                        padding="6px"
                        marginLeft ="20px"
                        h="60px"
                        _focusVisible={{
                            outline: "none"
                        }}
                        border="none"
                        placeholder='Bạn đang nghĩ gì' >
                            {currContent}
                        </Text>
                    </Box>
                    <Box ref={editPostRef} display = "none">
                        <Textarea  
                        margin='6px'
                        display="block"
                        backgroundColor="#bee0ec"
                        borderRadius= "10px"
                        w="300px"
                        padding="6px"
                        marginLeft ="20px"
                        h="20px"
                        _focusVisible={{
                            outline: "none"
                        }}
                        border="none"
                        value={currTitle}
                        onChange = {(e) => {
                            setCurrTitle(e.currentTarget.value)
                        }}
                        placeholder='Tiêu đề' />

                        <Textarea  
                        margin='6px'
                        display="block"
                        backgroundColor="#bee0ec"
                        borderRadius= "10px"
                        w="300px"
                        padding="6px"
                        marginLeft ="20px"
                        h="60px"
                        _focusVisible={{
                            outline: "none"
                        }}
                        border="none"
                        value={currContent}
                        onChange = {(e) => {
                            setCurrContent(e.currentTarget.value)
                        }}
                        placeholder='Bạn đang nghĩ gì' />
                    </Box>
                    <Flex alignItems= "center" justifyContent="end">
                        <Button
                        margin="0 8px"
                        w="80px"
                        h="30px"
                        borderRadius = "6px"
                        backgroundColor='#bee0ec'
                        border="none"
                        onClick={editPostOnClick}
                        >
                            Sửa
                        </Button>
                        <Button
                        margin="0 8px"
                        w="80px"
                        h="30px"
                        borderRadius = "6px"
                        backgroundColor='#bee0ec'
                        border="none"
                        onClick={addCommentOnClick}
                        >
                            Bình luận
                        </Button>
                        <Button
                        margin="0 8px"
                        w="80px"
                        h="30px"
                        borderRadius = "6px"
                        backgroundColor='#bee0ec'
                        border="none"
                        onClick={deleteOnClick}
                        >
                            Xóa
                        </Button>
                    </Flex>
                    <Box 
                    ref={commentRef}
                    display = "none"
                    >
                        <Textarea  
                        margin='6px'
                        display="block"
                        backgroundColor="#bee0ec"
                        borderRadius= "10px"
                        w="300px"
                        padding="6px"
                        marginLeft ="20px"
                        h="30px"
                        _focusVisible={{
                            outline: "none"
                        }}
                        border="none"
                        value={currContentComment}
                        onChange={(e) => setCurrContentComment(e.currentTarget.value)}
                        placeholder='Bình luận' />
                        <Flex alignItems= "center" justifyContent="end">
                        <Button
                        margin="0 8px"
                        w="80px"
                        h="30px"
                        borderRadius = "6px"
                        backgroundColor='#bee0ec'
                        border="none"
                        onClick={() => {
                            commentRef.current.style.display = 'none'
                            addComment(id, currContentComment)
                            setCurrContentComment("")
                        }}
                        >
                            Bình luận
                        </Button>
                    </Flex>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
}

export default SinglePost;