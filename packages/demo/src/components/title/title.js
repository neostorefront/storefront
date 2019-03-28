// @flow
import * as React from 'react';
import { FelaComponent, withTheme } from 'react-fela';

type Props = {
    children?: React.Node,
    theme: Object,
    fullWidth?: boolean,
    extend?: any,
};

const Title = ({
    children,
    theme,
    fullWidth = true,
    extend,
    ...rest
}: Props) => (
    <FelaComponent
        style={[
            {
                fontSize: '1.3em',
                marginTop: '0.5em',
                marginBottom: '0.5em',
                desktop: {
                    fontSize: '2em',
                },
                tablet: {
                    fontSize: '2em',
                },
            },
            fullWidth ? theme.page.contentWidth : null,
            theme.text.header,
            ...extend,
        ]}
        {...rest}
    >
        {children}
    </FelaComponent>
);

export default withTheme(Title);
