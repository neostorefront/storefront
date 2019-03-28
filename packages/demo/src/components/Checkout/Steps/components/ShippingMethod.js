// @flow
import Currency from '../../../Cart/components/Currency';
import React from 'react';

type Props = {
    method_title: string,
    carrier_title: string,
    carrier_code: string,
    method_code: string,
    total: number,
    onSelect: (method: any) => void,
};

const ShippingMethod = ({
    method_code,
    method_title,
    carrier_code,
    carrier_title,
    total,
    onSelect,
}: Props) => (
    <div>
        <input
            name="shipping-method"
            type="radio"
            value={carrier_code + '_' + method_code}
            onChange={e => onSelect(carrier_code + '_' + method_code)}
        />
        <label htmlFor="shipping-method">
            {method_title} ({carrier_title}) <Currency value={total} />
        </label>
    </div>
);

export default ShippingMethod;
