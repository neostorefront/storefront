// @flow
import React, { Component } from 'react';
import { PlatformContext } from 'platform';
import { CheckoutButton } from './styles.css';

/**
 * AddToCart Properties
 */
type Props = {
    item: Object,
};

/**
 * AddToCart State
 */
type State = {};

/**
 */
export default class AddToCart extends Component<Props, State> {
    render() {
        return (
            <PlatformContext.Consumer>
                {context => (
                    <CheckoutButton
                        onClick={() => {
                            context.addItem(this.props.item);
                        }}
                        style={{ background: '#F2C862' }}
                        aria-label="Add To Cart"
                    >
                        Add To Cart
                    </CheckoutButton>
                )}
            </PlatformContext.Consumer>
            // <Mutation mutation={ADD_CART_ITEM}>
            //     {mutation => (
            //         <AddToCartButton
            //             onClick={e => {
            //                 mutation({
            //                     variables: {
            //                         item: this.props.item,
            //                     },
            //                 });
            //             }}
            //         >
            //             Add To Cart
            //         </AddToCartButton>
            //     )}
            // </Mutation>
        );
    }
}
