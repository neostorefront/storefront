// @flow
import { FelaComponent } from 'react-fela';
import * as React from 'react';
import { combineRules } from 'fela';

type Margin =
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12;

type Direction = 'row' | 'column';

type BoxProps = {
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
    alignSelf?:
        | 'auto'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'baseline'
        | 'stretch',
    alignContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'stretch',
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly',
    flex?: 'grow' | 'shrink' | 'none' | 'inline',
    direction?: Direction,
    bg?: string,
    margin?: Margin,
    children?: React.Node,
    extend?: Object,
    props: Object,
    as?: string,
};

const BoxStyles = (props: BoxProps) => {
    let result: any = {
        display: props.flex
            ? props.flex === 'inline'
                ? 'inline-flex'
                : 'flex'
            : 'inherit',
        alignItems: props.alignItems,
        alignSelf: props.alignSelf,
        alignContent: props.alignContent,
        justifyContent: props.justifyContent,
        background: props.bg,
        margin: props.margin,
    };

    if (props.flex) {
        switch (props.flex) {
            case 'shrink':
                result.flexShrink = '2';
                break;

            case 'grow':
                result.flexGrow = '1';
                break;
        }
    }

    if (props.direction) {
        result.flexDirection = props.direction;
    }

    return combineRules([result, props.extend]);
};

const Box = ({ children, as = 'div', props, ...rest }: BoxProps) => {
    const Tag = as;

    return (
        <FelaComponent style={BoxStyles(rest)}>
            {({ className }) => (
                <Tag {...props} className={className}>
                    {children}
                </Tag>
            )}
        </FelaComponent>
    );
};

export default Box;
