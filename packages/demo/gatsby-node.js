const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const Promise = require('bluebird');
const fs = require('fs');

exports.onCreateBabelConfig = ({ actions }) => {
    actions.setBabelPlugin({
        name: 'babel-plugin-import-graphql',
        options: {
            sourceMap: true,
        },
    });
    actions.setBabelPlugin({
        name: 'babel-plugin-module-resolver',
        options: {
            root: ['./src'],
            alias: {
                // src: './src/venia/',
                // src: '@magento/venia-concept/src/',
                // src: './node-modules/@magento/venia-concept/src/',
                // src:
                //     '/Users/stan/freelance/rpmspeed-storefront/node_modules/@magento/venia-concept/src/',
            },
        },
    });
    actions.setBabelPreset({
        name: '@babel/preset-flow',
    });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            plugins: [new DirectoryNamedWebpackPlugin()],
            extensions: ['.mjs', '.js', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto',
                },
            ],
        },
    });

    if (stage === 'build-javascript') {
        // turn off source-maps
        // actions.setWebpackConfig({
        //     devtool: false,
        // });
    }
};

function createProdPages({ graphql, actions }) {
    const { createPage } = actions;

    return new Promise((resolve, reject) => {
        resolve(
            graphql(
                `
                    {
                        allMagentoProduct {
                            edges {
                                node {
                                    magento_id
                                    sku
                                    url_key
                                    small_image
                                    image {
                                        childImageSharp {
                                            fluid(
                                                maxWidth: 1024
                                                maxHeight: 1024
                                            ) {
                                                src
                                                srcSet
                                                sizes
                                                aspectRatio
                                                base64
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        allMagentoCategory {
                            edges {
                                node {
                                    magento_id
                                    url_key
                                    url_path
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                if (result.errors) {
                    reject(result.errors);
                }

                const outDir = './public/static/products';

                if (!fs.existsSync(outDir)) {
                    fs.mkdirSync(outDir);
                }
                // Create pages for each product
                result.data.allMagentoProduct.edges.forEach(({ node }) => {
                    createPage({
                        path: `/${node.url_key}/`,
                        component: path.resolve(`./src/pages/product.jsx`),
                        context: {
                            url_key: node.url_key,
                        },
                    });

                    // id is gatsby.js node id. we need to put magento_id there instead
                    const dstProduct = {
                        ...node,
                        id: node.magento_id,
                    };
                    delete dstProduct.magento_id;

                    const productData = JSON.stringify(dstProduct);
                    fs.writeFileSync(
                        outDir + '/' + dstProduct.sku + '.json',
                        productData
                    );
                });

                result.data.allMagentoCategory.edges.forEach(({ node }) => {
                    const blocksMap = {
                        men: 'men-block',
                        women: 'women-block',
                        'what-is-new': 'new-block',
                        sale: 'sale-block',
                    };

                    const block_id = blocksMap[node.url_key]
                        ? blocksMap[node.url_key]
                        : '';

                    createPage({
                        path: `/${node.url_path}/`,
                        component: path.resolve(`./src/pages/category.jsx`),
                        context: {
                            category_id: node.magento_id,
                            url_key: node.url_key,
                            block_id,
                        },
                    });

                    // id is gatsby.js node id. we need to put magento_id there instead
                    const dstCategory = {
                        ...node,
                        id: node.magento_id,
                    };

                    delete dstCategory.magento_id;
                });
            })
        );
    });
}

function createDevPages({ graphql, actions }) {
    const { createPage } = actions;

    return new Promise((resolve, reject) => {
        graphql(
            `
                {
                    allMagentoProduct {
                        edges {
                            node {
                                magento_id
                                url_key
                            }
                        }
                    }
                    allMagentoCategory {
                        edges {
                            node {
                                magento_id
                                url_key
                                url_path
                            }
                        }
                    }
                }
            `
        ).then(result => {
            if (result.errors) {
                reject(result.errors);
            }

            if (!result.data) {
                console.error(result);
                reject(new Error('failed to fetch products'));
            }

            // Create pages for each product
            result.data.allMagentoProduct.edges.forEach(({ node }) => {
                createPage({
                    path: `/${node.url_key}/`,
                    component: path.resolve(`./src/pages/product.dev.jsx`),
                    context: {
                        url_key: node.url_key,
                    },
                });

                // id is gatsby.js node id. we need to put magento_id there instead
                const dstProduct = {
                    ...node,
                    id: node.magento_id,
                };

                delete dstProduct.magento_id;
            });

            result.data.allMagentoCategory.edges.forEach(({ node }) => {
                createPage({
                    path: `/${node.url_path}/`,
                    component: path.resolve(`./src/pages/category.dev.jsx`),
                    context: {
                        category_id: node.magento_id,
                        url_key: node.url_key,
                    },
                });

                // id is gatsby.js node id. we need to put magento_id there instead
                const dstCategory = {
                    ...node,
                    id: node.magento_id,
                };

                delete dstCategory.magento_id;
            });

            resolve();
        });
    });
}

exports.createPages = opts => {
    return process.env.NODE_ENV === 'production'
        ? createProdPages(opts)
        : createDevPages(opts);
};
