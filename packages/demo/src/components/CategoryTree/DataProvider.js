// @flow
import React, { Component } from 'react';
import { graphql, StaticQuery } from 'gatsby';

/**
 * DataProvider Properties
 */
type Props = {
    render: (data: Object) => any,
};

const categoryQuery = graphql`
    query CategoryQuery {
        allMagentoCategory(
            filter: { level: { eq: 2 }, include_in_menu: { eq: 1 } }
        ) {
            edges {
                node {
                    id
                    name
                    include_in_menu
                    url_key
                }
            }
        }
    }
`;

const DataProvider = ({ render }: Props) => (
    <StaticQuery
        query={categoryQuery}
        render={data => {
            return data.allMagentoCategory.edges.map(({ node }) =>
                render(node)
            );
        }}
    />
);

export default DataProvider;
