import React from 'react';
import { FelaComponent } from 'react-fela';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

const Fela = ({ children, style, as = 'div', ...rest }) => {
    const Tag = as;
    const htmlProps = filterInvalidDOMProps(rest);

    return (
        <FelaComponent {...rest} style={style}>
            {({ className }) => (
                <Tag {...htmlProps} className={className}>
                    {children}
                </Tag>
            )}
        </FelaComponent>
    );
};

export default Fela;
