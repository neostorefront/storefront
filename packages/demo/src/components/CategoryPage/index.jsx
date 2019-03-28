import React from 'react';
import Box from 'layout/Box';
import Img from 'gatsby-image';
import Catalog from 'components/Catalog';
import { Link } from '@reach/router';
import { transformMagentoFeed } from 'platform/magento/transform';
import SubCategories from './components/SubCategories';
import BreadCrumbs from './components/BreadCrumbs';
import Title from 'components/title';
import CmsBlockRenderer from 'components/CmsBlockRenderer';
import { withTheme } from 'react-fela';

const BlockWrapper = withTheme(({ theme, children }: any) => (
    <Box extend={[{}, theme.page.contentWidth]}>{children}</Box>
));

const CategoryPage = ({
    data: {
        magentoCategory: category,
        magentoCategory: { children, products, breadcrumbs },
        magentoCmsBlock,
    } = {},
}) => (
    <>
        <Title>{category.name}</Title>
        <BlockWrapper>
            {magentoCmsBlock && magentoCmsBlock.nodes ? (
                <CmsBlockRenderer nodes={magentoCmsBlock.nodes} />
            ) : null}
        </BlockWrapper>
        <BreadCrumbs breadcrumbs={breadcrumbs} />
        {products ? <Catalog items={transformMagentoFeed(products)} /> : null}
    </>
);

export default CategoryPage;
