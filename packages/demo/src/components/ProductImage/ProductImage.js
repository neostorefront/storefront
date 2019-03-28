// @flow
import React, { Component, memo } from 'react';
import Img from 'gatsby-image';
import imageQuery from './imageQuery.graphql';

/**
 * ProductImage Properties
 */
type Props = {
    item: Object,
};

/**
 * ProductImage State
 */
type State = {
    imageData: any,
};

/**
 * This components loads product image data from JSON
 */
class ProductImage extends Component<Props, State> {
    state = {
        imageData: {},
    };

    constructor(props: Props) {
        super(props);

        this.loadImageData();
    }

    async loadImageData() {
        const { item } = this.props;
        try {
            if (!item.image || !item.image.childImageSharp.fluid.src) {
                const imageData = await getImageData(
                    item.sku,
                    item.productType
                );
                this.setState({
                    imageData,
                });
            } else {
                this.setState({
                    imageData: item.image,
                });
            }
        } catch (e) {}
    }

    render() {
        const { imageData } = this.state;
        if (!imageData.childImageSharp) {
            return null;
        }
        return (
            <Img
                fluid={imageData.childImageSharp.fluid}
            />
        );
    }
}

export default memo(ProductImage);

const PRODUCTION = process.env.NODE_ENV === `production`;

async function getImageData(cartSku: string, productType: string) {
    let sku = cartSku;
    if (productType === 'configurable') {
        const parts = cartSku.split('-');

        if (parts.length > 1) {
            sku = parts[0];
        }
    }

    if (PRODUCTION) {
        const result = await fetch('/static/products/' + sku + '.json');
        const json = await result.json();
        return json.image;
    } else {
        const { default: gatsbyClient } = await import('client.gatsby');
        const result = await gatsbyClient.query({
            query: imageQuery,
            variables: {
                sku,
            },
        });

        return result.data.magentoProduct.image;
    }
}
