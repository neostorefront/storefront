import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Head from 'components/head';
import Header from 'components/header';
import EcommercePlatform from 'components/EcommercePlatform';
import MagentoPlatformContext from 'platform/magento/MagentoPlatformContext';

const Layout = ({ data, children }) => (
    <MagentoPlatformContext>
        <EcommercePlatform>
            <Head />
            <Header title={data.site.siteMetadata.siteTitle} />
            {children}
        </EcommercePlatform>
    </MagentoPlatformContext>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired,
};

const LayoutWithQuery = props => (
    <StaticQuery
        query={graphql`
            query LayoutQuery {
                site {
                    siteMetadata {
                        siteTitle
                    }
                }
            }
        `}
        render={data => <Layout data={data} {...props} />}
    />
);

LayoutWithQuery.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LayoutWithQuery;
