// @flow
import React, { Component } from 'react';
import Step from './components/Step';
import AddressForm from '../../Cart/components/AddressForm';
import StepRenderer from './components/StepRenderer';
import StepContext from './components/StepContext';
import CustomerStep from './components/CustomerStep';
import Shipping from './components/Shipping';
import gql from 'graphql-tag';
import client from 'platform/client';
import { AddressFragment } from 'platform/fragments';
import Query from 'react-apollo/Query';
// import PaymentForm from 'containers/checkout/Steps/components/PaymentForm';
import { stepTitleStyle } from './components/Step.css';
import Box from 'layout/Box';
import { PlatformContext } from 'platform';

let PaymentForm = null;
if (typeof window !== 'undefined') {
    PaymentForm = require('./components/PaymentForm')
        .default;
}

const ADDRESSES_QUERY = gql`
    query {
        shippingAddress @client {
            ...AddressFragment
        }
        billingAddress @client {
            ...AddressFragment
        }
    }
    ${AddressFragment}
`;

/**
 * Steps Properties
 */
type Props = {};

/**
 * Steps State
 */
type State = {
    activeStep: string,
    steps: string[],
    stepContext: StepContextType,
};

export default class Steps extends Component<Props, State> {
    static contextType = PlatformContext;

    constructor(props: Props) {
        super(props);
        this.state = {
            activeStep: 'customer',
            steps: [],
            stepContext: {
                open: this.open.bind(this),
            },
        };
    }

    open(activeStep: string) {
        this.setState({
            activeStep,
        });
    }

    setShippingMethod = method => {
        this.context.setShippingMethod(method);
    };

    setShippingAddress = (address: any) => {
        this.context.setShippingAddress(address);
    };

    setBillingAddress = (address: any) => {
        this.context.setBillingAddress(address);
    };

    render() {
        const { activeStep, stepContext } = this.state;
        return (
            <Query query={ADDRESSES_QUERY}>
                {({ data }) => (
                    <StepContext.Provider value={stepContext}>
                        <StepRenderer activeStep={activeStep}>
                            <Step name="customer" title="Customer" index={1}>
                                <CustomerStep
                                    onContinue={() => {
                                        stepContext.open('shipping');
                                    }}
                                />
                            </Step>
                            <Step name="shipping" title="Shipping" index={2}>
                                <AddressForm
                                    data={data.shippingAddress}
                                    onSubmit={address => {
                                        this.setShippingAddress(address);
                                    }}
                                />
                                <Box extend={stepTitleStyle}>
                                    Shipping Method
                                </Box>
                                <Shipping
                                    onSelect={method => {
                                        this.setShippingMethod(method);
                                        stepContext.open('billing');
                                    }}
                                />
                            </Step>
                            <Step name="billing" title="Billing" index={3}>
                                <AddressForm
                                    data={data.billingAddress}
                                    onSubmit={address => {
                                        this.setBillingAddress(address);
                                        stepContext.open('payment');
                                    }}
                                />
                            </Step>
                            <Step name="payment" title="Payment" index={4}>
                                {typeof window !== 'undefined' ? (
                                    <PaymentForm />
                                ) : null}
                            </Step>
                        </StepRenderer>
                    </StepContext.Provider>
                )}
            </Query>
        );
    }
}
