// @flow
import React from 'react';
import DataProvider from './DataProvider';
import Box from 'layout/Box';
import { Link } from '@reach/router';

/**
 * TreeView Properties
 */
type Props = {};

const menuItemStyle = {
    '> a': {
        color: '#404040',
        display: 'flex',
        height: '4.5rem',
        padding: '0 1.25rem',
        '> span': {
            alignItems: 'center',
            borderBottom: '1px solid #c0c0c0',
            display: 'flex',
            flex: 'auto',
            height: '4.5rem',
            padding: '0 0.25rem',
        },
    },
};

const TreeView = (props: Props) => (
    <Box extend={{ textAlign: 'left' }}>
        <DataProvider
            render={node => {
                return (
                    <Box key={node.id} extend={menuItemStyle}>
                        <Link to={node.url_key}>
                            <span>{node.name}</span>
                        </Link>
                    </Box>
                );
            }}
        />
    </Box>
);

export default TreeView;
