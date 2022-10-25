import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Flex, Button, Image,Textarea, Box, Text } from '@chakra-ui/react'
import axios from 'axios';

Comment.propTypes = {
    idComment: PropTypes.number,
    idBlog: PropTypes.number,
    content: PropTypes.string,
    setIsReload: PropTypes.func
};

function Comment(props) {
    const {content, idComment, idBlog, setIsReload} = props
    const [currContent, setCurrContent] = useState(content)
    

    const deleteComment = (idBlog, idComment) => {
        axios.delete(`http://localhost:5000/comment/delete/${idBlog}/${idComment}`)
        .then(res => {
            if (res.status === 200) {
                setIsReload(true)
            }
        })
    }
    const updateComment = (idBlog, idComment, content) => {
        axios.put(`http://localhost:5000/comment/update/${idBlog}/${idComment}`, {
            content: content
        }).then(res => {
            if (res.status === 200) {
                setIsReload(true)
            }
        })
    }
    const deleteOnClick = () => {
        deleteComment(idBlog,idComment)
    }
    const updateOnclick = () => {
        updateComment(idBlog, idComment, currContent)
    }
    const editRef = useRef()
    const currentRef = useRef()
    const editCommnetOnClick = () => {
        editRef.current.style.display = "block"
        currentRef.current.style.display = "none"
    }
    return (
        <Flex
        alignItems="center"
        justifyContent = "center"
        width= "100%"
        min = "160px"
        marginTop={"20px"}
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
                    <Text  
                    ref={currentRef}
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
                    placeholder='Bình luận'>
                        {currContent}
                    </Text>
                    
                    
                    <Box 
                    ref={editRef}
                    display = "none"
                    marginBottom="12px"
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
                        value={currContent}
                        onChange={(e) => {
                            setCurrContent(e.currentTarget.value)
                        }}
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
                            updateOnclick()
                            editRef.current.style.display="none"
                            currentRef.current.style.display="block"
                        }}
                        >
                            Bình luận
                        </Button>
                    </Flex>
                    </Box>
                    <Flex alignItems= "center" justifyContent="end">
                        <Button
                        margin="0 8px"
                        w="80px"
                        h="30px"
                        borderRadius = "6px"
                        backgroundColor='#bee0ec'
                        border="none"
                        onClick={editCommnetOnClick}
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
                        onClick={deleteOnClick}
                        >
                            Xóa
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
}

export default Comment;