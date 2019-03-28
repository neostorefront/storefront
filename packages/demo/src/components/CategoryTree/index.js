// @flow
import React, { useState } from 'react';
import { Drawer } from './Drawer';
import Box from 'layout/Box';
import DataProvider from './DataProvider';
import { Menu, ShoppingCart, ArrowLeft, XCircle } from 'react-feather/dist';
import TreeView from 'components/CategoryTree/TreeView';
import SearchIcon from 'components/header/nav/menu';
/**
 * CategoryTree Properties
 */
type Props = {};

const menuHeaderStyle = {
    alignContent: 'center',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 1px #c0c0c0',
    display: 'grid',
    gridAutoColumns: '3.5rem',
    gridAutoFlow: 'column',
    gridAutoRows: '3.5rem',
    gridTemplateColumns: '3.5rem 1fr 3.5rem',
    height: '5rem',
    position: 'relative',
    zIndex: 1,
};

const menuHeaderTextStyle = {
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: '1.4rem',
    fontWeight: 400,
    textTransform: 'uppercase',
};

const menuButtonStyle = {
    display: 'inline-flex',
    border: 'none',
    background: 'none',
    '>svg': {
        width: '1.8rem',
    },
};

const CategoryTree = (props: Props) => {
    const [opened, setOpened] = useState(false);
    const [drawerTouched, setDrawerTouched] = useState(false);

    const closeDrawer = () => {
        setOpened(!opened);
        setDrawerTouched(true);
    };

    return (
        <>
            <Box
                as="button"
                extend={{
                    display: 'block',
                    '> svg': {
                        cursor: 'pointer',
                        fill: 'white',
                    },
                }}
            >
                <Menu aria-label="Menu" onClick={closeDrawer} />
            </Box>
            <Drawer
                closing={!opened}
                touched={drawerTouched}
                onClose={e => {
                    setOpened(false);
                }}
            >
                <Box extend={menuHeaderStyle}>
                    <Box as="button" extend={menuButtonStyle} props={{'aria-label': 'Back'}}>
                        <ArrowLeft onClick={closeDrawer} />
                    </Box>
                    <Box extend={menuHeaderTextStyle} as="h4">
                        Main Menu
                    </Box>
                    <Box as="button" extend={menuButtonStyle} props={{'aria-label': 'Close'}}>
                        <XCircle onClick={closeDrawer} />
                    </Box>
                </Box>
                <TreeView />
            </Drawer>
        </>
    );
};

export default CategoryTree;
