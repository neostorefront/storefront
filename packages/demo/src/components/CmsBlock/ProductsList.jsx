// @flow
import React from 'react';
import { transformMagentoFeed } from 'platform/magento/transform';
import Catalog from 'components/Catalog';

/**
 * ProductList Properties
 */
type Props = {};

const ProductsList = (props: Props) => {
    return <Catalog items={transformMagentoFeed(props.items)} />;
};

export default ProductsList;
