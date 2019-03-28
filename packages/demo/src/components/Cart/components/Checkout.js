// @flow
import React, { Component } from 'react';
import Fela from 'helpers/Fela';
import ShippingAddress from './ShippingAddress';
import autobind from 'autobind-decorator';
import CartContents from './CartContents';
import Totals from './Totals';
import { CartView } from './Cart.css';
import ProceedButton from './CheckoutProceedButton';

/**
 * Checkout Properties
 */
type Props = {};

/**
 * Checkout State
 */
type State = {};

const CheckoutContainer = props => (
    <Fela
        {...props}
        style={{
            position: 'fixed',
            left: '0',
            top: '12rem',
            right: '0',
            bottom: '0',
            display: 'flex',
            background: 'rgb(249, 249, 248)',
        }}
    />
);

const CheckoutStep = props => (
    <Fela
        {...props}
        style={{
            flexGrow: '1',
            opacity: props.active ? '1' : '0.3',
            '& h3': {
                textAlign: 'center',
                fontSize: '2rem',
                padding: '2rem',
            },
        }}
    />
);

/**
 */
export default class Checkout extends Component<Props, State> {
    state = {
        activeStep: 0,
    };

    shippingAddressEntered(address) {
        this.setState({
            activeStep: 1,
        });
    }

    placeOrder() {
        // this.
    }

    render() {
        const { activeStep } = this.state;
        return (
            <CheckoutContainer>
                <CheckoutStep active={activeStep === 0}>
                    <h3>Shipping & Billing</h3>
                    <ShippingAddress
                        onSubmit={values => this.shippingAddressEntered(values)}
                    />
                </CheckoutStep>
                <CheckoutStep active={activeStep === 1}>
                    <h3>Payment Information</h3>
                    <div>
                        <label>
                            <input type="radio" /> Check / money order
                        </label>
                        {activeStep === 1 && (
                            <ProceedButton
                                onClick={e => {
                                    this.setState({
                                        activeStep: 2,
                                    });
                                }}
                            >
                                Proceed
                            </ProceedButton>
                        )}
                    </div>
                </CheckoutStep>
                <CheckoutStep active={activeStep === 2}>
                    <h3>Review order</h3>
                    <CartContents skipHeader={true} />
                    <Totals
                        onCheckout={() => {
                            this.placeOrder();
                        }}
                    />
                </CheckoutStep>
            </CheckoutContainer>
        );
    }
}
