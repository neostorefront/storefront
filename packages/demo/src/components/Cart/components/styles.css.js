import React from 'react';
import Fela from 'helpers/Fela';

const checkoutButtonStyle = () => ({
    WebkitAppearance: 'none',
    // backgroundColor: '#F2C862',
    borderRadius: '5px',
    border: 'none',
    color: '#000',
    // border: '1px solid #dddddd',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '1.3rem',
    fontWeight: '500',
    padding: '1rem 2rem',
    textTransform: 'uppercase',
    transition: '0.2s background-color ease',
    '&: active, &: focus': {
        boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    },
    '&: hover': {
        backgroundColor: '#e0b852',
    },
    '& + &': {
        marginLeft: '1rem',
    },
});

const linkedSpanStyle = () => {
    return {
        color: '#529bff',
        ':hover': {
            color: '#592bff',
            cursor: 'pointer',
        },
    };
};

export const CheckoutButton = ({ style, ...props }) => (
    <Fela {...props} style={[checkoutButtonStyle, style]} as="button" />
);

export const SimpleButton = ({ style, ...props }) => (
    <Fela {...props} style={[checkoutButtonStyle, style]} as="button" />
);

export const SmallButton = ({ style, ...props }) => (
    <Fela
        {...props}
        style={[checkoutButtonStyle, style, { padding: '0.5em', margin: '0' }]}
        as="button"
    />
);

export const LinkedSpan = ({ style, ...props }) => (
    <Fela {...props} style={[linkedSpanStyle, style]} as="span" />
);
