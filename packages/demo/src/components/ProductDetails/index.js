import React, { Suspense, useState } from 'react';
import Box from 'layout/Box';
import Title from 'components/title';
import Img from 'gatsby-image';
import AddToCart from 'components/Cart/components/AddToCart';
import { withTheme } from 'react-fela';

const Options = React.lazy(() => import('components/ProductOptions'));

export const ProductDetailsView = withTheme(({ theme, children }: any) => (
    <Box
        extend={[
            {
                justifyContent: 'center',
                display: 'block',
                margin: '2em 0',
                tablet: {
                    display: 'flex',
                },
                desktop: {
                    display: 'flex',
                },
            },
            theme.page.contentWidth,
        ]}
    >
        {children}
    </Box>
));

export const ImageWrap = props => (
    <Box
        extend={{
            minWidth: '95vw',
            desktop: {
                minWidth: '30vw',
            },
            tablet: {
                minWidth: '30vw',
            },
            '> div': {
                width: '100%',
            },
        }}
    >
        {props.children}
    </Box>
);

const ProductDetails = ({ data: { magentoProduct: product } }) => {
    const [options, setOptions] = useState({});

    return (
        <div>
            {product && (
                <>
                    <ProductDetailsView>
                        <ImageWrap>
                            {product.image.childImageSharp ? (
                                <Img
                                    fluid={product.image.childImageSharp.fluid}
                                />
                            ) : (
                                <div>error</div>
                            )}
                        </ImageWrap>

                        <div>
                            <Title fullWidth={false}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: product.name,
                                    }}
                                />
                            </Title>

                            {product.type_id === 'configurable' &&
                            typeof window !== 'undefined' ? (
                                <Suspense
                                    fallback={() => <div>Loading...</div>}
                                >
                                    <Options
                                        options={product.configurable_options}
                                        onSelectionChange={(
                                            optionId,
                                            value
                                        ) => {
                                            setOptions({
                                                ...options,
                                                [optionId]: value,
                                            });
                                        }}
                                    />
                                </Suspense>
                            ) : null}

                            <Box
                                extend={{ padding: '1em', textAlign: 'center' }}
                            >
                                <AddToCart
                                    item={toItem({ ...product, options })}
                                />
                            </Box>
                            <Box extend={{ padding: '1em' }}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                />
                            </Box>
                        </div>
                    </ProductDetailsView>
                </>
            )}
        </div>
    );
};

function toItem(item) {
    const typeMap = {
        configurable: 'ConfigurableProduct',
    };

    const productType = typeMap[item.type_id]
        ? typeMap[item.type_id]
        : 'SimpleProduct';

    const converted = {
        id: item.id,
        name: item.name,
        sku: item.sku,
        productType,
        price: item.price.regularPrice.amount.value,
        qty: 1,
        url: `/${item.url_key}/`,
        image: item.image,
        options: Object.entries(item.options).map(
            ([option_id, option_value]) => ({
                option_id,
                option_value: Array.from(option_value)[0],
            })
        ),
    };

    if (productType === 'ConfigurableProduct') {
        converted.parentSku = item.sku;
    }

    return converted;
}

export default ProductDetails;
