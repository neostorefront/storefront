import React from 'react';
import { CheckoutButton } from './styles.css';

const ProceedButton = props => (
    <CheckoutButton
        {...props}
        style={{
            width: '100%',
            borderRadius: '1.5rem',
            border: 'none',
            background: '#333',
            fontWeight: 'bold',
            color: '#fff',
            padding: '0.8em 0',
        }}
    />
);

export default ProceedButton;
