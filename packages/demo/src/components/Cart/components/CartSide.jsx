// @flow
import React, { Component } from 'react';
import { CartView, Drawer } from 'components/Cart/components/Cart.css';
import CartContents from 'components/Cart/components/Cart';
import { navigate } from '@reach/router';
import Totals from './Totals';

/**
 * CartSide Properties
 */
type Props = {};

const CartSide = (props: Props) => (
    <Drawer closing={false} touched={true} onClose={e => this.toggle()}>
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

export default CartSide;
