// @flow
import React, { useState } from 'react';
import Currency from './Currency';
import Img from 'gatsby-image';
import ProductImage from 'components/ProductImage';
import CartItemQuantity from './CartItemQuantity';
import { MoreVertical as Edit } from 'react-feather';
import { PlatformContext } from 'platform';
import Box from 'layout/Box';

/**
 * CartItem Properties
 */
type Props = {
    item: Object,
};

const CartItem = ({ item }: Props) => {
    const [isEditing, setEditing] = useState(false);

    return (
        <Box
            flex
            key={item.id}
            extend={{ clear: 'both', marginBottom: '0.5em' }}
        >
            <Box
                extend={{
                    marginRight: '2em',
                    marginLeft: '1em',
                    border: 'solid 1px #f0f0f0',
                    width: '100px',
                    height: '100px',
                    display: 'block',
                }}
            >
                <ProductImage item={item} />
            </Box>
            <Box
                flex
                direction="column"
                extend={{
                    maxWidth: '50%',
                    lineHeight: '1.6',
                }}
            >
                <Box extend={{ fontWeight: 'bold' }}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: item.name,
                        }}
                    />
                </Box>
                <Box>
                    {item.qty} x <Currency value={item.price} />
                </Box>

                {isEditing ? (
                    <CartItemQuantity
                        item={item}
                        onClose={() => setEditing(false)}
                    />
                ) : (
                    <Edit onClick={e => setEditing(true)} />
                )}
            </Box>
        </Box>
    );
};

export default CartItem;
