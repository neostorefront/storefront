import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Price } from '@magento/peregrine';
// import classify from 'src/classify';
import { Link } from 'gatsby';
import { FelaComponent } from 'react-fela';
import ProductImage from 'components/ProductImage/ProductImage';

// import defaultClasses from './suggestedProduct.css';

const productUrlSuffix = '';
// const productUrlSuffix = '.html';

const Wrapper = props => (
    <FelaComponent
        style={{
            alignContent: 'start',
            alignItems: 'center',
            display: 'grid',
            gridGap: '0.375rem 1rem',
            gridTemplateAreas: 'image name price',
            gridTemplateColumns: '60px 1fr',
            gridTemplateRows: 'min-content',
            paddingBottom: '1rem',
        }}
        as="li"
        {...props}
    />
);

class suggestedProduct extends Component {
    // static propTypes = {
    //     handleOnProductOpen: PropTypes.func.isRequired,
    //     url_key: PropTypes.string.isRequired,
    //     small_image: PropTypes.string.isRequired,
    //     name: PropTypes.string.isRequired,
    //     price: PropTypes.object.isRequired,
    //     classes: PropTypes.shape({
    //         root: PropTypes.string,
    //         productName: PropTypes.string,
    //         productImage: PropTypes.string
    //     })
    // };

    render() {
        const {
            handleOnProductOpen,
            classes,
            url_key,
            small_image,
            name,
            price,
        } = this.props;

        // const productLink = resourceUrl(`/${url_key}${productUrlSuffix}`);
        const productLink = `/${url_key}${productUrlSuffix}`;

        return (
            <Wrapper>
                <Link onClick={handleOnProductOpen} to={productLink}>
                    <ProductImage item={this.props} />
                </Link>
                <Link onClick={handleOnProductOpen} to={productLink}>
                    {name}
                </Link>
                <Link onClick={handleOnProductOpen} to={productLink}>
                    <Price
                        currencyCode={price.regularPrice.amount.currency}
                        value={price.regularPrice.amount.value}
                    />
                </Link>
            </Wrapper>
        );
    }
}

export default suggestedProduct;
