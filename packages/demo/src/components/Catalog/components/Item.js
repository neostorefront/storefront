import { Link } from 'gatsby';
import React, { memo } from 'react';
import { FelaComponent, withTheme } from 'react-fela';
import Img from 'gatsby-image';
import Price from 'components/Price';
import Currency from 'components/Cart/components/Currency';
import AddToCart from 'components/Cart/components/AddToCart';
import ProductName from './ProductName';

const CatalogItemContainer = withTheme(({ theme, children }: any) => (
    <FelaComponent
        style={{
            alignSelf: 'stretch',
            justifySelf: 'stretch',
            padding: '0.5em',
            textAlign: 'center',
            '> div > div > img': {
                maxWidth: '200px',
            },
        }}
    >
        {children}
    </FelaComponent>
));

const Item = ({ item }) => {
    return (
        <CatalogItemContainer>
            <div>
                <Link to={item.url}>
                    {item.image &&
                    item.image.childImageSharp &&
                    item.image.childImageSharp.fluid ? (
                        <Img
                            fluid={item.image.childImageSharp.fluid}
                            fadeIn={false}
                            alt={item.name}
                        />
                    ) : (
                        <div>error</div>
                    )}
                </Link>
            </div>
            <ProductName>
                <Link to={item.url} aria-label={"Read more about " + item.name}>
                    <span dangerouslySetInnerHTML={{ __html: item.name }} />
                </Link>
            </ProductName>
            <Price>
                <Currency value={item.price} />
            </Price>
            {/*<AddToCart item={item} />*/}
        </CatalogItemContainer>
    );
};

export default memo(Item);
