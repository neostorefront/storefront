// @flow
import React from 'react';
import Img from 'gatsby-image';
import Box from 'layout/Box';
import { Link } from '@reach/router';
import { withTheme } from 'react-fela';

/**
 * SubCategories Properties
 */
type Props = {
    theme: Object,
    categories?: Array<Object>,
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

const SubCategories = withTheme(({ theme, categories }: Props) => (
    <Box
        direction={'row'}
        flex={'grow'}
        extend={[style, theme.page.contentWidth]}
    >
        {categories
            ? categories.map(node => (
                  <Box>
                      <Link to={node.url_path}>
                          {node.image && node.image.childImageSharp ? (
                              <Img fluid={node.image.childImageSharp.fluid} />
                          ) : null}{' '}
                          {node.name}
                      </Link>
                  </Box>
              ))
            : null}
    </Box>
));

export default SubCategories;
