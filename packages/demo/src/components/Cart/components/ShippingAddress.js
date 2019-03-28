// @flow
import React from 'react';
import Box from 'layout/Box';
import AddressForm from './AddressForm';

/**
 * ShippingAddress Properties
 */
type Props = {
    onSubmit: address => void,
};

/**
 */
const ShippingAddress = ({ onSubmit }: Props) => (
    <Box flex>
        <AddressForm onSubmit={onSubmit} />
    </Box>
);
