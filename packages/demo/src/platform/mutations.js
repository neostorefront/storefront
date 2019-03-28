import gql from 'graphql-tag';
import { CartItemFragment } from './fragments';

export default {
    updateNetworkStatus: (_, { isConnected }, { cache }) => {
        cache.writeData({ data: { isConnected } });
        return null;
    },

    addCartItem: async (_, { item }, { cache }) => {
        const query = gql`
            query GetCart {
                cart @client {
                    ...CartItemFragment
                }
            }
            ${CartItemFragment}
        `;

        let data = null;
        const previous = cache.readQuery({ query });
        let existing = previous.cart.findIndex(
            cartItem => cartItem.id === item.id
        );

        if (existing !== -1) {
            const newCart = [...previous.cart];

            newCart[existing].qty += item.qty ? item.qty : 1;

            data = {
                cart: newCart,
            };
        } else {
            if (!item.qty) {
                item.qty = 1;
            }

            const newItem = {
                ...item,
                __typename: 'CartItem',
            };

            newItem.image.__typename = 'Image';
            newItem.image.childImageSharp.__typename = 'SharpImage';
            newItem.image.childImageSharp.fluid.__typename = 'FluidImage';
            const newCart = previous.cart.concat([newItem]);

            data = {
                cart: newCart,
            };
        }

        cache.writeData({ data });

        return null;
    },

    setCartContents: async (_, { items }, { cache }) => {
        const cart = items;

        cache.writeData({
            data: {
                cart,
            },
        });

        return null;
    },

    setCartTotals: async (_, { totals }, { cache }) => {
        cache.writeData({
            data: {
                totals: totals,
            },
        });

        return null;
    },

    setShippingMethods: async (_, { methods }, { cache }) => {
        cache.writeData({
            data: {
                shippingMethods: methods,
            },
        });

        return null;
    },

    setEmail: async (_, { email }, { cache }) => {
        cache.writeData({
            data: {
                email,
            },
        });

        return null;
    },

    setShippingAddress: async (_, { address }, { cache }) => {
        if (!address.country) {
            address.country = 'US';
        }

        cache.writeData({
            data: {
                shippingAddress: address,
                billingAddress: address,
            },
        });

        return null;
    },

    setBillingAddress: async (_, { address }, { cache }) => {
        if (!address.country) {
            address.country = 'US';
        }

        cache.writeData({
            data: {
                billingAddress: address,
            },
        });

        return null;
    },

    setCountries: async (_, { countries }, { cache }) => {
        cache.writeData({
            data: {
                countries,
            },
        });

        return null;
    },

    setShippingMethod: async (_, { method }, { cache }) => {
        cache.writeData({
            data: {
                shippingMethod: method,
            },
        });

        return null;
    },
};

function getEmail(cache) {
    const query = gql`
        query {
            email @client
        }
    `;

    const { email } = cache.readQuery({ query });

    return email;
}

function calcTotals(cart) {
    let total = 0,
        subtotal = 0,
        tax = 0,
        shipping = 0;

    for (const item of cart) {
        total += Number(item.price);
        subtotal += Number(item.price);
    }

    return { total, subtotal, tax, shipping, __typename: 'Totals' };
}
