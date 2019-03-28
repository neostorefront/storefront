// @flow
import React, { Component } from 'react';
import Box from 'layout/Box';
import { withTheme } from 'react-fela';
import Item from './components/Item';
import Pagination from './components/Pagination/index';
import { graphql } from 'gatsby';

/**
 * Catalog Properties
 */
type Props = {};

/**
 * Catalog State
 */
type State = {};

const CatalogWrapper = withTheme(({ theme, children }: any) => (
    <Box
        extend={[
            {
                display: 'grid',
                grid: 'auto / repeat(2, 1fr)',
                gridGap: '4px 4px',
                tablet: {
                    grid: 'auto / repeat(3, 1fr)',
                    gridGap: '20px 20px',
                },
                desktop: {
                    grid: 'auto / repeat(5, 1fr)',
                    gridGap: '40px 40px',
                    padding: '4rem',
                },
            },
            theme.page.contentWidth,
        ]}
    >
        {children}
    </Box>
));

/**
 */
export default class Catalog extends Component<Props, State> {
    render() {
        return (
            <div>
                <CatalogWrapper>
                    {this.props.items.map(item => (
                        <Item key={item.id} item={item} />
                    ))}
                </CatalogWrapper>

                {/*<Pagination />*/}
            </div>
        );
    }
}

export const query = graphql`
    fragment CatalogProductFragment on MagentoProduct {
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
`;
