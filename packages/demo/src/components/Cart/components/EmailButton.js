import React from 'react';
import { SimpleButton } from './styles.css';

const EmailButton = props => (
    <SimpleButton
        {...props}
        style={{
            width: '100%',
            borderRadius: '1.5rem',
            border: 'none',
            fontWeight: 'bold',
            color: '#444',
            padding: '1em 0',
            margin: '0',
            ':focus': {
                outline: 'none',
            },
        }}
    />
);

export default EmailButton;
