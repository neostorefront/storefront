// @flow
import React from 'react';
import gql from 'graphql-tag';
import Query from 'react-apollo/Query';
import { CatalogContext } from 'platform/index';

/**
 * SearchQuery Properties
 */
type Props = {
    searchQuery: string,
    children: any,
};

const PRODUCT_SEARCH = gql`
    query productSearch($inputText: String!, $categoryId: String) {
        products(
            search: $inputText
            filter: { category_id: { eq: $categoryId } }
        ) {
            items {
                id
                name
                small_image
                url_key
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
            }
            total_count
            filters {
                name
                filter_items_count
                request_var
                filter_items {
                    label
                    value_string
                }
            }
        }
    }
`;

const CatalogQuery = ({ searchQuery, children }: Props) => (
    <Query
        query={PRODUCT_SEARCH}
        variables={{
            inputText: searchQuery,
        }}
    >
        {({ loading, error, data }) => {
            if (error)
                return (
                    <div>
                        <div>Data Fetch Error</div>
                    </div>
                );

            if (loading) return <div>{'Loading...'}</div>;

            const { items } = data.products;

            if (items.length <= 0)
                return <div>No results found, try a different search</div>;

            return (
                <CatalogContext.Provider value={{ items }}>
                    {children}
                </CatalogContext.Provider>
            );
        }}
    </Query>
);

export default CatalogQuery;
