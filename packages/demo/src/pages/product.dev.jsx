import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import gatsbyClient from 'client.gatsby.js';
import ProductDetails from 'components/ProductDetails';
import gql from 'graphql-tag';

const pageQuery = gql`query ProductQuery($url_key: String) {
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

        categories {
            id
            name
            url_path
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
`

const ProductDetailsPage = ({ pageContext: { url_key } }) => {
    const [gatsbyData, setGatsbyData] = useState(0);

    const loadData = async () => {
        const result = await gatsbyClient.query({
            query: pageQuery,
            variables: {
                url_key,
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
                <ProductDetails data={gatsbyData} />
            ) : (
                <div>Loading...</div>
            )}
        </Layout>
    );
};

export default ProductDetailsPage;
