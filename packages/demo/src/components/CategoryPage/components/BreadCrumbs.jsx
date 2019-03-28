// @flow
import React from 'react';
import { withTheme } from 'react-fela';
import Box from 'layout/Box';
import { Link } from '@reach/router';

type BreadCrumb = {
    category_url_key: String,
    category_name: String,
};

/**
 * BreadCrumbs Properties
 */
type Props = {
    theme: Object,
    breadcrumbs?: BreadCrumb[],
};

const style = {
    display: 'block',
    tablet: {
        display: 'flex',
    },
    desktop: {
        display: 'flex',
    },
};

export const BreadCrumbs = withTheme(({ theme, breadcrumbs }: Props) =>
    breadcrumbs ? (
        <Box extend={[style, theme.page.contentWidth]}>
            {breadcrumbs.map((item: BreadCrumb) => (
                <span key={item.category_url_key}>
                    <Link to={'/' + item.category_url_key}>
                        {item.category_name}
                    </Link>
                </span>
            ))}
        </Box>
    ) : null
);

export default BreadCrumbs;
