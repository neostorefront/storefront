// @flow
import React, { Component, Fragment } from 'react';
import Query from 'react-apollo/Query';
import gql from 'graphql-tag';
import { FelaComponent } from 'react-fela';
import CartItem from './CartItem';

/**
 * CartContents Properties
 */
type Props = {
    skipHeader: boolean,
};

/**
 * CartContents State
 */
type State = {};

const CART_CONTENTS = gql`
    {
        cart @client {
            id
            name
            sku
            productType
            image {
                childImageSharp {
                    fluid {
                        aspectRatio
                        base64
                        src
                        srcSet
                        sizes
                    }
                }
            }
            price
            qty
        }
    }
`;

const Qty = props => (
    <FelaComponent
        {...props}
        style={{
            textTransform: 'none',
            lineHeight: '2em',
        }}
    />
);

const Price = props => (
    <FelaComponent
        {...props}
        style={{
            lineHeight: '2em',
            textTransform: 'none',
        }}
    />
);

const CartItems = props => (
    <FelaComponent
        {...props}
        style={{
            height: '65%',
            flexGrow: '1',
            overflowY: 'scroll',
        }}
    />
);

/**
 */
export default class CartContents extends Component<Props, State> {
    static defaultProps = {
        skipHeader: false,
    };

    render() {
        const { skipHeader } = this.props;
        return (
            <Query query={CART_CONTENTS}>
                {result => {
                    const { data } = result;
                    if (!data.cart) {
                        return null;
                    }

                    return (
                        <Fragment>
                            {!skipHeader && (
                                <div>
                                    <h3>Your Bag</h3>
                                </div>
                            )}
                            <CartItems>
                                {data.cart.map(item => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </CartItems>
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}
