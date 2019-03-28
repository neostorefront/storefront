import React from 'react';
import Layout from 'components/Layout';
import { graphql } from 'gatsby';
import ProductDetails from 'components/ProductDetails';

const Product = ({ data }) => (
    <Layout>
        <ProductDetails data={data} />
    </Layout>
);

export default Product;

export const query = graphql`
    query ProductQuery($url_key: String) {
        homeJson {
            title
        }

        magentoProduct(url_key: { eq: $url_key }) {
            id
            sku
            name
            description
            small_image
            type_id
            image {
                childImageSharp {
                    fluid(maxWidth: 1024, maxHeight: 1024) {
                        src
                        srcSet
                        sizes
                        aspectRatio
                    }
                }
            }
            
            configurable_options {
                attribute_id
                attribute_code
                label
                values {
                    label
                    value_index
                }
            }

            categories {
                id
                name
                url_path
            }

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
    }
`;
