import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import CategoryPageComponent from 'components/CategoryPage';
import { graphql } from 'gatsby';
// import { CatalogProductFragment } from 'platform/fragments';

const CategoryPage = ({ data }) => {
    return (
        <Layout>
            {data ? (
                <CategoryPageComponent data={data} />
            ) : (
                <div>Loading...</div>
            )}
        </Layout>
    );
};

export default CategoryPage;

export const query = graphql`
    query CategoryPageQuery($category_id: Int, $block_id: String) {
        magentoCategory(magento_id: {eq: $category_id }) {
            id
            name
            url_key
            path

            breadcrumbs {
                category_url_key
                category_name
            }

            children {
                ... on MagentoCategory {
                    id
                    name
                    url_path
                    image {
                        childImageSharp {
                            fluid(maxWidth: 152, maxHeight: 164) {
                                src
                                srcSet
                                sizes
                                aspectRatio
                            }
                        }
                    }
                }
            }

            products {
                ... CatalogProductFragment
            }
        }

        magentoCmsBlock(identifier: { eq: $block_id }) {
            title
            content
#            nodes {
#                type
#                value
#                items {
#                    ... on MagentoProduct {
#                        ... index_CatalogProductFragment
#                    }
#                }
#            }
        }

    }
`;
