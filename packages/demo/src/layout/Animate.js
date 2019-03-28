// @flow
import { FelaComponent, FelaRenderer } from 'react-fela';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

type Props = {
    keyframes: Object,
    keyframeProps?: Object,
    style?: Object,
    as?: string,
    children: any,
};

const Animate = (props: Props) => (
    <FelaRenderer>
        {renderer => {
            const {
                keyframes,
                keyframeProps = {},
                style = {},
                children,
                as,
                ...rest
            } = props;

            let animationName = '';

            if (keyframes) {
                animationName = renderer.renderKeyframe(
                    keyframes,
                    keyframeProps
                );
            }

            const htmlProps = filterInvalidDOMProps(rest);
            const Tag = as ? as : 'div'

            return (
                <FelaComponent
                    style={{
                        animationName,
                        animationDuration: '1s',
                        animationTimingFunction: 'ease-out',
                        animationDirection: 'alternate',
                        animationFillMode: 'both',
                        ...style,
                    }}
                >
                    {({ className }) => (
                        <Tag {...htmlProps} className={className}>
                            {children}
                        </Tag>
                    )}
                </FelaComponent>
            );
        }}
    </FelaRenderer>
);

export default Animate;
