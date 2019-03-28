import { FelaComponent, withTheme } from 'react-fela';
import React from 'react';

const ProductName = withTheme(({ theme, children }) => (
    <FelaComponent
        style={{
            display: 'block',
            lineHeight: '2em',
            fontFamily: "'Source Sans Pro', sans-serif",
            '& a': {
                textDecoration: 'none',
                color: '#333',
            },
        }}
        as="strong"
    >
        {children}
    </FelaComponent>
));

export default ProductName;
