// @flow
import React, { Component } from 'react';
import { mapChildren } from 'utils/react';
import Step from './Step';

/**
 * StepRenderer Properties
 */
type Props = {
    activeStep: string,
    children: React.ChildrenArray<React.Element<typeof Step>>,
};

/**
 * StepRenderer State
 */
type State = {};

/**
 */
export default class StepRenderer extends Component<Props, State> {
    renderStep = (child: Step) => {
        const { activeStep } = this.props;
        const { children, ...rest } = child.props;
        return (
            <Step isOpen={activeStep === child.props.name} {...rest}>
                {children}
            </Step>
        );
    };

    render() {
        const { children } = this.props;
        return mapChildren(children, this.renderStep, this);
    }
}
