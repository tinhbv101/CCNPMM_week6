import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Button, Image,Container, Box } from '@chakra-ui/react'
import SinglePost from './singlePost';
import Comment from './comment';

Posts.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    comments: PropTypes.array,
    setIsReload: PropTypes.func,
    updatePost: PropTypes.func,
    deleteBlog: PropTypes.func,
};

function Posts(props) {
    const {id, title, content, comments, setIsReload, updatePost, deleteBlog} = props

    return (
        <>
            <Flex
            width= "100%"
            min = "160px"
            marginTop={"20px"}
            paddingTop ="60px"
            justifyContent="center"
            alignItems="center"
            >
                <Box
                padding= "20px"
                backgroundColor="#bee0ec"
                borderRadius="20px"
                w="600px"
                >
                    <SinglePost setIsReload = {setIsReload} id={id} title={title} content={content} updatePost={updatePost} deleteBlog={deleteBlog}/>
                    <Box>
                        {
                            comments.map(comment => {
                                return <Comment key={id + "-" + comment.id} idBlog={id} setIsReload={setIsReload} idComment={comment.id}  content={comment.content}/>
                            })
                        }
                    </Box>
                </Box>
            </Flex>
        </>
    );
}

export default Posts;