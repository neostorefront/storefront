// @flow
import React, { Component, Fragment } from 'react';
import Query from 'react-apollo/Query';
import { Drawer, CartView } from './Cart.css';
import CartContents from './CartContents';
import { FelaComponent } from 'react-fela';
import Totals from './Totals';
import { navigate } from '@reach/router';
import gql from 'graphql-tag';
import ShoppingCart from 'react-feather/dist/icons/shopping-cart';
import Box from 'layout/Box';

// let Cart = () => {};
// const isSSR = typeof window === `undefined`;
// if (!isSSR) {
//     Cart = React.lazy(() => import('components/Cart/components/Cart'));
// }
//
const CART_ITEMS_COUNT = gql`
    query {
        totals {
            itemsQty
        }
    }
`;

/**
 * Cart Properties
 */
type Props = {};

/**
 * Cart State
 */
type State = {
    opened: Boolean,
};

const CartIconWrap = props => (
    <FelaComponent
        {...props}
        extend={{
            display: 'block',
            '> span > svg': {
                cursor: 'pointer',
                fill: 'white',
            },
        }}
    />
);

const ItemsCount = props => (
    <Box
        {...props}
        extend={{
            cursor: 'pointer',
            display: 'inline-flex',
            fontWeight: '600',
            opacity: '0.95',
            marginLeft: '0.3em',
        }}
        as="span"
    />
);

/**
 */
export default class Cart extends Component<Props, State> {
    state = {
        opened: false,
        drawerTouched: false,
        checkout: false,
        orderPlaced: false,
    };

    toggle() {
        this.setState({ drawerTouched: true, opened: !this.state.opened });
    }

    onPlaceOrder() {
        this.setState({
            orderPlaced: true,
        });
    }

    renderDrawer() {
        const { opened, checkout, drawerTouched } = this.state;

        return (
            <Drawer
                closing={!opened}
                touched={drawerTouched}
                onClose={e => this.toggle()}
            >
                <CartView>
                    <CartContents />
                    <Totals
                        onCheckout={() => {
                            navigate('/checkout');
                        }}
                    />
                </CartView>
            </Drawer>
        );
    }

    render() {
        return (
            <Query query={CART_ITEMS_COUNT}>
                {({ data }) => {
                    return (
                        <>
                            <CartIconWrap>
                                <Box
                                    alignItems="center"
                                    direction="row"
                                    flex="inline"
                                >
                                    <Box
                                        extend={() =>
                                            data.totals &&
                                            data.totals.itemsQty > 0
                                                ? {
                                                      '>svg': {
                                                          fill: '#000',
                                                          cursor: 'pointer',
                                                      },
                                                  }
                                                : {
                                                      cursor: 'pointer',
                                                  }
                                        }
                                    >
                                        <ShoppingCart
                                            onClick={e => this.toggle()}
                                        />
                                    </Box>
                                    <ItemsCount>
                                        {data.totals && data.totals.itemsQty}
                                    </ItemsCount>
                                </Box>

                                {this.renderDrawer()}
                            </CartIconWrap>
                        </>
                    );
                }}
            </Query>
        );
    }
}
