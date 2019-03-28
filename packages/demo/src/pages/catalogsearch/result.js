import React from 'react';
import { parse } from 'query-string';
import Box from 'layout/Box';
import Layout from 'components/Layout';
import Catalog from 'components/Catalog';
import CatalogQuery from 'components/EcommercePlatform/CatalogQuery';
import { CatalogContext } from 'platform';

const Result = props => {
    const { q } = parse(props.location.search);

    return (
        <Layout>
            <Box>
                <h2>Search Results</h2>
                query - <b>{q}</b>
            </Box>
            <CatalogQuery searchQuery={q}>
                <CatalogContext.Consumer>
                    {({ items }) => {
                        return (
                            <Catalog items={items.map(transformMagentoFeed)} />
                        );
                    }}
                </CatalogContext.Consumer>
            </CatalogQuery>
        </Layout>
    );
};

function transformMagentoFeed(item) {
    return {
        id: item.id,
        sku: item.sku,
        name: item.name,
        price: item.price ? item.price.regularPrice.amount.value : 0,
        qty: 1,
        url: `/${item.url_key}/`,
        image: item.image,
    };
}

export default Result;
