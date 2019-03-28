import { FelaComponent, withTheme } from 'react-fela';
import React from 'react';

const Price = withTheme(({ theme, children }) => (
    <FelaComponent
        style={{
            fontWeight: 'bold',
            fontFamily: "'Source Sans Pro', sans-serif",
            lineHeight: '1.8em',
        }}
    >
        {children}
    </FelaComponent>
));

export default Price;
