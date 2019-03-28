import React from 'react';
import { SimpleButton } from './styles.css';

const SubmitButton = props => (
    <SimpleButton
        {...props}
        style={{
            width: '100%',
            borderRadius: 0,
            border: 'none',
            fontWeight: 'bold',
            color: '#444',
            padding: '1em 0',
        }}
    />
);

export default SubmitButton;
