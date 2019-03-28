// @flow
import store from '@magento/venia-concept/esm/store';
import {
    getGuestCartId,
    getCartDetails,
    addItemToCart,
    updateItemInCart,
    removeItemFromCart,
} from '@magento/venia-concept/esm/actions/cart';

import {
    // beginCheckout,
    submitShippingAddress,
    submitBillingAddress,
    getShippingMethods,
    submitShippingMethod,
} from '@magento/venia-concept/esm/actions/checkout';

import { getCountries } from '@magento/venia-concept/esm/actions/directory';
import client from '../client';
import gql from 'graphql-tag';

export default {
    loadCart: async () => {
        await getGuestCartId(store.dispatch, store.getState);
        await store.dispatch(getCartDetails());

        //// DIRECTORY LOADING!
        await store.dispatch(getCountries());
        await store.dispatch(getShippingMethods());
        updateCountries();
        updateShippingMethods();

        refreshCart();
    },

    addItem: async (item: CartItem) => {
        await getGuestCartId(store.dispatch, store.getState);

        await store.dispatch(
            addItemToCart({
                item: {
                    sku: item.sku,
                    name: item.name,
                },
                options: item.options ? item.options : {},
                parentSku: item.parentSku,
                productType: item.productType ? item.productType : 'SimpleProduct',
                quantity: item.qty,
            })
        );

        refreshCart();
    },

    updateItem: async (internalItem: CartItem) => {
        const item = {
            ...internalItem,
            item_id: internalItem.id,
        };

        if (item.qty === 0) {
            await store.dispatch(removeItemFromCart({ item }));
        } else {
            await store.dispatch(
                updateItemInCart({ item, quantity: item.qty }, item.id)
            );
        }

        refreshCart();
    },

    async setShippingMethod(method: string) {
        const mutation = gql`
            mutation SetShippingMethod($method: String!) {
                setShippingMethod(method: $method) @client
            }
        `;

        client.mutate({
            mutation,
            variables: {
                method,
            },
        });

        const parts = method.split('_');

        const shippingMethod = {
            carrier_code: parts[0],
            method_code: parts[1],
        };

        const payload = {
            type: 'shippingMethod',
            formValues: { shippingMethod },
        };

        await store.dispatch(submitShippingMethod(payload));
    },

    async setShippingAddress(address: Object) {
        const mutation = gql`
            mutation UpdateAddress($address: Address!) {
                setShippingAddress(address: $address) @client
            }
        `;

        client.mutate({
            mutation,
            variables: {
                address: {
                    ...address,
                    __typename: 'Address',
                },
            },
        });

        const email = getEmail();

        await store.dispatch(
            submitShippingAddress({
                formValues: prepareAddress(email, address),
            })
        );
        await store.dispatch(
            submitBillingAddress(prepareAddress(email, address))
        );

        await store.dispatch(getShippingMethods());
    },

    async setBillingAddress(address: Object) {
        const mutation = gql`
            mutation UpdateAddress($address: Address!) {
                setBillingAddress(address: $address) @client
            }
        `;

        client.mutate({
            mutation,
            variables: {
                address: {
                    ...address,
                    __typename: 'Address',
                },
            },
        });

        const email = getEmail();
        await store.dispatch(
            submitBillingAddress(prepareAddress(email, address))
        );
    },
};

function convertMagentoItem(item: MagentoCartItem) {
    const converted = {
        id: String(item.item_id),
        sku: item.sku,
        name: item.name,
        productType: item.product_type,
        image: {
            childImageSharp: {
                fluid: {
                    aspectRatio: 1,
                    base64: '',
                    sizes: '',
                    src: '',
                    srcSet: '',
                    __typename: 'FluidImage',
                },
                __typename: 'SharpImage',
            },
            __typename: 'Image',
        },
        price: item.price,
        // image: null,
        qty: item.qty,
        __typename: 'CartItem',
    };
    return converted
}

function refreshCart() {
    const {
        cart: { details: { items = [] } = {}, totals: magentoTotals } = {},
    } = store.getState();

    const cart = items.map(convertMagentoItem);
    const totals = convertMagentoTotals(magentoTotals);

    const mutation = gql`
        mutation UpdateCart($items: [CartItem!]!, $totals: Totals!) {
            setCartContents(items: $items) @client
            setCartTotals(totals: $totals) @client
        }
    `;

    client.mutate({
        mutation,
        variables: {
            items: cart,
            totals,
        },
    });
}

function updateCountries() {
    const {
        directory: { countries },
    } = store.getState();

    const mutation = gql`
        mutation UpdateCountries($countries: [Country!]!) {
            setCountries(countries: $countries) @client
        }
    `;

    client.mutate({
        mutation,
        variables: {
            countries: countries.map(convertCountry),
        },
    });
}

function updateShippingMethods() {
    const {
        checkout: { availableShippingMethods },
    } = store.getState();

    const mutation = gql`
        mutation UpdateMethods($methods: [ShippingMethod!]!) {
            setShippingMethods(methods: $methods) @client
        }
    `;

    client.mutate({
        mutation,
        variables: {
            methods: availableShippingMethods.map(convertShippingMethod),
        },
    });
}

// amount: 0
// available: true
// base_amount: 0
// carrier_code: "tablerate"
// carrier_title: "Best Way"
// code: "tablerate"
// error_message: ""
// method_code: "bestway"
// method_title: "Table Rate"
// price_excl_tax: 0
// price_incl_tax: 0
// title: "Best Way"
function convertShippingMethod(method: Object) {
    return {
        total: method.amount,
        carrier_code: method.carrier_code,
        carrier_title: method.carrier_title,
        method_code: method.method_code,
        method_title: method.method_title,
        __typename: 'ShippingMethod',
    };
}

/**
 *
 * base_currency_code: "USD"
 base_discount_amount: 0
 base_grand_total: 135
 base_shipping_amount: 0
 base_shipping_discount_amount: 0
 base_shipping_incl_tax: 0
 base_shipping_tax_amount: 0
 base_subtotal: 135
 base_subtotal_with_discount: 135
 base_tax_amount: 0
 discount_amount: 0
 grand_total: 135
 items: [{…}]
 items_qty: 27
 quote_currency_code: "USD"
 shipping_amount: 0
 shipping_discount_amount: 0
 shipping_incl_tax: 0
 shipping_tax_amount: 0
 subtotal: 135
 subtotal_incl_tax: 135
 subtotal_with_discount: 135
 tax_amount: 0
 total_segments: Array(4)
 0: {code: "subtotal", title: "Subtotal", value: 135}
 1: {code: "shipping", title: "Shipping & Handling", value: 0}
 2: {code: "tax", title: "Tax", value: 0, extension_attributes: {…}}
 3: {code: "grand_total", title: "Grand Total", value: 135, area: "footer"}
 length: 4
 __proto__: Array(0)
 weee_tax_applied_amount: null
 *
 * @param totals
 * @returns {{total: *, shipping: *, subtotal: number, __typename: string, tax: *}}
 */
function convertMagentoTotals(totals: any) {
    return {
        subtotal: totals.subtotal,
        tax: totals.tax_amount,
        shipping: totals.shipping_amount,
        total: totals.grand_total,
        itemsQty: totals.items_qty,
        __typename: 'Totals',
    };
}

function convertCountry(country: any) {
    return {
        id: country.id,
        full_name: country.full_name_locale,
        regions: country.available_regions
            ? country.available_regions.map(convertRegion)
            : [
                  {
                      id: null,
                      code: null,
                      name: null,
                      __typename: 'Region',
                  },
              ],
        __typename: 'Country',
    };
}

function convertRegion(region: any) {
    return {
        ...region,
        __typename: 'Region',
    };
}

function getEmail() {
    const query = gql`
        query {
            email @client
        }
    `;

    const { email } = client.readQuery({ query });

    return email;
}

function prepareAddress(email: string, address: Object) {
    const formValues = {
        country_id: address.country ? address.country : 'US',
        region_code: address.state,
        street: [address.street, address.street2],
        company: '',
        telephone: address.phone,
        postcode: address.postcode,
        city: address.city,
        firstname: address.firstName,
        lastname: address.lastName,
        email,
        saveInAddressBook: null,
    };

    return formValues;
}
