// @flow
import React from 'react';
import Query from 'react-apollo/Query';
import gql from 'graphql-tag';
import ShippingMethod from './ShippingMethod';

/**
 * Shipping Properties
 */
type Props = {
    onSelect: (method: any) => void,
};

const CART_CONTENTS = gql`
    {
        shippingMethods @client {
            method_title
            carrier_title
            carrier_code
            method_code
            total
        }
    }
`;

const Shipping = ({ onSelect }: Props) => (
    <Query query={CART_CONTENTS}>
        {result => {
            const { data: { shippingMethods } = {} } = result;

            if (!shippingMethods) {
                return null;
            }

            return (
                <div>
                    {shippingMethods.map(method => (
                        <ShippingMethod
                            key={method.carrier_code + '_' + method.method_code}
                            {...method}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            );
        }}
    </Query>
);

export default Shipping;
