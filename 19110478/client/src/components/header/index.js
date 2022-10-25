import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Heading } from '@chakra-ui/react'
import { Link } from "react-router-dom";

Header.propTypes = {
    
};

function Header(props) {
    return (
        <Flex
        alignItems={"center"}
        justifyContent={"space-around"}
        width={"100%"}
        height={"80px"}
        backgroundColor={"#2596be"}
        position={"fixed"}
        marginTop = {"-80px"}
        zIndex="10"
        >
            <Heading as="h1">
                <Link to={"/blogs"}>BLOGS</Link>
            </Heading>
        </Flex>
    );
}

export default Header;