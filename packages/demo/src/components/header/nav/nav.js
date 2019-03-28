import React from 'react';

import Menu from './menu';
import Box from 'layout/Box';

const menu = [
    {
        title: 'Home',
        url: '/',
    },
    // {
    //     title: 'Camaro',
    //     url: '/camaro/',
    // },
    // {
    //     title: 'Dodge',
    //     url: '/dodge/',
    // },
];

const navStyle = {
    background: '#f0f0f0',
};

const Nav = () => (
    <Box as="nav" extend={navStyle}>
        <Menu items={menu} />
    </Box>
);

export default Nav;
