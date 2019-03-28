import React from 'react';
import Layout from 'components/Layout';
import Box from 'layout/Box';
import Title from 'components/title';
import { graphql } from 'gatsby';
import Catalog from '../components/Catalog';
import { transformMagentoFeed } from 'platform/magento/transform';
import CmsBlockRenderer from 'components/CmsBlockRenderer';
import { withTheme } from 'react-fela';
// import { CatalogProductFragment } from 'platform/fragments';

const BlockWrapper = withTheme(({ theme, children }: any) => (
    <Box extend={[{}, theme.page.contentWidth]}>{children}</Box>
));

const Index = ({ data }) => (
    <Layout>
        <BlockWrapper>
            <CmsBlockRenderer nodes={data.homeBlock.nodes} />
        </BlockWrapper>
        <div style={{ height: '50vh' }} />
    </Layout>
);

export default Index;

export const query = graphql`
    query HomepageQuery {
        homeBlock: magentoCmsBlock(identifier: { eq: "home-page-block" }) {
            title
            content
            nodes {
                type
                value
                items {
                    ... on MagentoProduct {
                        ...CatalogProductFragment
                    }
                }
            }
        }
    }
`;
