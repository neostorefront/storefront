import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import posed from 'react-pose';
import { Container } from './header.css';
import Title from 'components/title';
import Nav from 'components/header/nav';
import styled from 'styled-components';

// Example of a component-specific page transition
const AnimatedContainer = posed.div({
    enter: {
        y: 0,
        transition: {
            ease: 'easeInOut',
        },
    },
    exit: {
        y: '-100%',
        transition: {
            ease: 'easeInOut',
        },
    },
});

const LogoWrap = styled.div`
    margin: 0 auto;
    text-align: center;
    display: block;
`;

const HeaderWrap = styled.div`
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 10;
`;

const Header = ({ title }) => (
    <HeaderWrap>
        <AnimatedContainer>
            <Container>
                <Nav />
            </Container>
        </AnimatedContainer>
    </HeaderWrap>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
