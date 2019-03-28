import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import gatsbyClient from 'client.gatsby.js';
import CategoryPage from 'components/CategoryPage';
import gql from 'graphql-tag';
import {CatalogProductFragment} from 'platform/fragments'

const pageQuery = gql`
    query CategoryQuery($category_id: Int, $block_id: String) {
        magentoCategory(magento_id: { eq: $category_id }) {
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
                id
                sku
                name
                small_image
                url_key
                image {
                    childImageSharp {
                        fluid(maxWidth: 152, maxHeight: 164) {
                            src
                            srcSet
                            sizes
                            aspectRatio
                            base64
                        }
                    }
                }
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
            }
        }

        magentoCmsBlock(identifier: { eq: $block_id }) {
            title
            content
            nodes {
                type
                value
                items {
                    ... on MagentoProduct {
                        ...CatalogProductFragment
                    }
                }
            }
        }
    }
    
    ${CatalogProductFragment}
`;

const CategoryPageDev = ({ pageContext: { url_key, category_id } }) => {
    const [gatsbyData, setGatsbyData] = useState(0);

    const blocksMap = {
        'men': 'men-block',
        'women': 'women-block',
        'what-is-new': 'new-block',
        'sale': 'sale-block',
    };

    const block_id = blocksMap[url_key] ? blocksMap[url_key] : '';

    
    const loadData = async () => {
        const result = await gatsbyClient.query({
            query: pageQuery,
            variables: {
                url_key,
                category_id,
                block_id,
            },
        });

        setGatsbyData(result.data);
    };
    //
    useEffect(() => {
        loadData();
    });

    return (
        <Layout>
            {gatsbyData ? (
                <CategoryPage data={gatsbyData} />
            ) : (
                <div>Loading...</div>
            )}
        </Layout>
    );
};

export default CategoryPageDev;
