import React from 'react';
import gql from 'graphql-tag';
import DropIn from 'braintree-web-drop-in-react';
import client from 'client';
import ApolloProvider from 'react-apollo/ApolloProvider';
import Query from 'react-apollo/Query';
import {
    submitPaymentMethod,
    submitOrder,
} from '@magento/venia-concept/esm/actions/checkout';
import store from '@magento/venia-concept/esm/store';
import ProceedButton from 'components/Cart/components/CheckoutProceedButton';
import { navigate } from 'gatsby';

const GET_CHECKOUT_CONFIG = gql`
    {
        checkoutConfig(id: 1) {
            braintree
            braintree_paypal
        }
    }
`;

function renderBrainTree(config: string) {
    const data = JSON.parse(config);

    const bt = data.payment.braintree;
    // console.log(data);
    // console.log('braintree data:', bt);

    return (
        <div>
            <PaymentForm clientToken={bt.clientToken} />
        </div>
    );
}

const TestPay = () => {
    return (
        <ApolloProvider client={client}>
            <Query query={GET_CHECKOUT_CONFIG}>
                {({ data: { checkoutConfig }, loading }) => (
                    <div>
                        {!loading && renderBrainTree(checkoutConfig.braintree)}
                    </div>
                )}
            </Query>
        </ApolloProvider>
    );
};

class PaymentForm extends React.Component {
    async buy() {
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();

        await store.dispatch(
            submitPaymentMethod({
                code: 'braintree',
                title: 'Credit Card (Braintree)',
                data: {
                    nonce,
                },
            })
        );

        await store.dispatch(
            submitOrder({
                payment_method_nonce: nonce,
            })
        );

        navigate('/checkout/success');
    }

    render() {
        if (!this.props.clientToken) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <DropIn
                        options={{
                            authorization: this.props.clientToken,
                            gatewayConfiguration: {
                                environment: 'development',
                            },
                        }}
                        onInstance={instance => (this.instance = instance)}
                    />

                    <ProceedButton
                        onClick={this.buy.bind(this)}
                        extend={{ background: '#f2c862' }}
                    >
                        Place Order
                    </ProceedButton>
                </div>
            );
        }
    }
}

export default TestPay;
