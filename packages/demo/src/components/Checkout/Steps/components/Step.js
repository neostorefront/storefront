// @flow
import React, { Component } from 'react';
import Box from 'layout/Box';
import Title from 'components/title/title';
import { FelaComponent, withTheme } from 'react-fela';
import StepContext from './StepContext';
import StepAnimator from './StepAnimator';
import { stepTitleStyle } from './Step.css';

/**
 * Step Properties
 */
type Props = {
    index: number,
    name: string,
    title: string,
    children: any,
    isOpen?: boolean,
};

/**
 * Step State
 */
type State = {};

const StepNumber = withTheme(({ index, theme }) => (
    <FelaComponent
        style={{
            borderRadius: '50%',
            backgroundColor: theme.color.highLight,
            width: '1em',
            height: '1em',
            padding: '0.2em',
            marginRight: '0.5em',
            display: 'inline-block',
            fontSize: '0.8em',
            textAlign: 'center',
        }}
    >
        {index}
    </FelaComponent>
));

/**
 */
export default class Step extends Component<Props, State> {
    renderBody = ({ open }: StepContextType) => {
        const { index, name, title, children, isOpen } = this.props;

        return (
            <>
                <Box extend={stepTitleStyle}>
                    <div onClick={e => open(name)}>
                        <StepNumber index={index} />
                        {title}
                    </div>
                </Box>
                {isOpen && (
                    <Box justifyContent="center" direction="column">
                        {children}
                    </Box>
                )}
            </>
        );
    };
    render() {
        return (
            <StepContext.Consumer>
                {ctx => this.renderBody(ctx)}
            </StepContext.Consumer>
        );
    }
}
