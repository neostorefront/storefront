const siteConfig = require('./site-config');

module.exports = {
    siteMetadata: {
        ...siteConfig,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-offline`,
        `gatsby-transformer-json`,
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/content`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-webpack-size`,
        {
            resolve: `gatsby-plugin-react-svg`,
            options: {
                rule: {
                    include: /images/,
                },
            },
        },
        {
            resolve: 'gatsby-source-magento2',
            options: {
                graphqlEndpoint: 'https://m23demo.mobelop.com/graphql',
                queries: {
                    cmsBlockQuery: `query {
    gatsbyCmsBlocks(identifiers: [
"footer_links_block",
"contact-us-info",
"sale-left-menu-block",
"gear-left-menu-block",
"men-left-menu-block",
"women-left-menu-block",
"new-left-menu-block",
"women-block",
"training-block",
"men-block",
"gear-block",
"sale-block",
"new-block",
"home-page-block",
"performance-fabrics-block",
"eco-friendly-block",
"giftcard-block",
"login-data"
    
    ])
    {
        items
        {
            identifier
            title
            content
        }
    }
}
                    `,
                    allProductsQuery: `query {
  products (
    filter:{
      sku: {
        like:"%"
      }
    }
    pageSize: 15000
  ) {
    items {
      id
      sku
      name
      type_id

      description
      short_description
      meta_title
      meta_keyword
      meta_description
      image
      small_image

      url_key
      
      new      
      performance_fabric
      eco_collection

      ... on ConfigurableProduct {
        configurable_options {
          attribute_id          
          attribute_code          
          label
          values {
            label
            value_index
          }
        }
      }
      categories {
        id
        name
        url_path
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
}`,
                },
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: `UA-73205031-6`,
                head: false,
            },
        },
    ],
};
