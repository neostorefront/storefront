export const CartItemFragment = `
    fragment CartItemFragment on CartItem {
        id
        name
        sku
        image {
          childImageSharp {
            fluid {
              aspectRatio
              base64
              src
              srcSet
              sizes
            }
          }
        }
        price
        qty
    }
`;
export const AddressFragment = `
    fragment AddressFragment on Address {
        firstName
        lastName
        phone
        state
        city
        postcode
        street
        street2
    }
`;

export const CatalogProductFragment = `
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
`
