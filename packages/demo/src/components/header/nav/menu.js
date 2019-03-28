import React, { Component, Fragment, Suspense } from 'react';
import { Link } from 'gatsby';
import Hamburger from './Hamburger';
import Cart from 'components/Cart/components/Cart';
import CategoryTree from 'components/CategoryTree';
import BoxIcon from 'react-feather/dist/icons/box';
import SearchIcon from 'react-feather/dist/icons/search';
import { FelaComponent, withTheme } from 'react-fela';
import SearchInput from '../../Search/SearchInput';
import Box from 'layout/Box';

// const CartLoader = () =>
//     isSSR ? null : (
//         <Suspense fallback={<span />}>
//             <Cart />
//         </Suspense>
//     );

const TopMenuWrap = withTheme(({ children, theme }) => (
    <Box
        extend={[
            {
                alignContent: 'center',
                alignItems: 'center',
                display: 'grid',
                gridTemplateAreas: 'primary title secondary',
                gridTemplateColumns: '1fr auto 1fr',
                gridTemplateRows: '3rem',
                justifyItems: 'center',
                minHeight: '5rem',
                padding: '0 1rem',
            },
            theme.header.background,
        ]}
    >
        {children}
    </Box>
));

const TopMenuItemList = withTheme(({ children, theme }) => (
    <FelaComponent
        as="ul"
        style={[
            {
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'left',
                flexGrow: '1',
            },
            theme.header.background,
        ]}
    >
        {children}
    </FelaComponent>
));

const TopMenuItemLi = withTheme(({ children, theme }) => (
    <FelaComponent
        as="li"
        style={[
            {
                '> a': theme.header.menu.text,
            },
        ]}
    >
        {children}
    </FelaComponent>
));

const MenuList = withTheme(({ children }) => (
    <FelaComponent as="ul" style={{}}>
        {children}
    </FelaComponent>
));

const MenuListMobile = withTheme(({ children }) => (
    <FelaComponent
        as="ul"
        style={{
            margin: '0',
            listStyle: 'none',
            background: 'deepskyblue',
        }}
    >
        {children}
    </FelaComponent>
));

const MenuItem = withTheme(({ children }) => (
    <FelaComponent
        as="li"
        style={{
            '> a': {
                textDecoration: 'none',
                display: 'block',
                color: '#fff',
                textAlign: 'center',
                fontSize: '1.4em',
                padding: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            },
        }}
    >
        {children}
    </FelaComponent>
));

const MobileBar = withTheme(({ children }) => (
    <FelaComponent
        as="ul"
        style={{
            background: '#444',
            display: 'none',
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 101,
            justifyContent: 'flex-end',
            phone: {
                display: 'flex',
            },
        }}
    >
        {children}
    </FelaComponent>
));

const MobileMenuContainer = withTheme(({ children }) => (
    <FelaComponent
        as="div"
        style={{
            display: 'none',
            position: 'absolute',
            left: 0,
            right: 0,
            top: '64px',
            height: 'auto',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            phone: { display: 'block' },
        }}
    >
        {children}
    </FelaComponent>
));

const MobileMenuContent = withTheme(({ children }) => (
    <FelaComponent
        as="div"
        style={{
            display: 'flex',
            flexFlow: 'column wrap',
            flexDirection: 'column',
            '> li:last-of-type > a': {
                borderBottom: 'none',
            },
        }}
    >
        {children}
    </FelaComponent>
));

const LeftBtn = withTheme(({ children }) => (
    <Box
        flex
        style={{
            flexGrow: 2,
            textAlign: 'left',
            padding: '0 1em',
            a: {
                color: '#f0f0f0',
            },
            'a:active': {
                color: '#fff',
            },
        }}
    >
        {children}
    </Box>
));

const RightBtn = withTheme(({ children }) => (
    <FelaComponent
        as="span"
        style={{
            display: 'block',
            padding: '0 1em',
        }}
    >
        {children}
    </FelaComponent>
));

class TopMenuItem extends React.Component {
    onClick = e => {
        this.props.onChange(this.props.item.url);
        e.stopPropagation();
        return false;
    };

    render() {
        const { title, url } = this.props.item;

        return (
            <TopMenuItemLi {...this.props}>
                <Link className="menu__link" to={url} onClick={this.onClick}>
                    {title}
                </Link>
            </TopMenuItemLi>
        );
    }
}

export class TopMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchVisible: false,
            currentItem:
                typeof window === 'undefined' ? null : window.location.pathname,
        };
    }

    onChange = url => {
        this.setState({ currentItem: url });
    };

    toggleSearch = e => {
        this.setState({
            searchVisible: !this.state.searchVisible,
        });
    };

    render() {
        const { items } = this.props;
        const { searchVisible } = this.state;

        const selected = this.state.currentItem;

        return (
            <>
                <TopMenuWrap>
                    <Box extend={{ justifySelf: 'start' }}>
                        <CategoryTree />
                    </Box>
                    <Link to="/" title="Home page">
                        <BoxIcon />
                    </Link>
                    {/*<TopMenuItemList>*/}
                    {/*{items.map((item, i) => (*/}
                    {/*<TopMenuItem*/}
                    {/*item={item}*/}
                    {/*key={i}*/}
                    {/*onChange={this.onChange}*/}
                    {/*selected={item.url === selected}*/}
                    {/*/>*/}
                    {/*))}*/}
                    {/*</TopMenuItemList>*/}
                    <Box
                        direction="row"
                        alignItems="center"
                        extend={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            justifyItems: 'end',
                            '>svg': {
                                cursor: 'pointer',
                            }
                        }}
                    >
                        <SearchIcon onClick={this.toggleSearch} aria-label="Search" />
                        <Cart aria-label="Shopping Cart"/>
                    </Box>
                </TopMenuWrap>
                {searchVisible && <SearchInput />}
            </>
        );
    }
}

export class MobileMenu extends React.Component {
    constructor() {
        super();

        this.state = {
            visible: false,
        };
    }

    toggleMenu = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    mobileMenu() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <MobileMenuContainer visible={this.state.visible}>
                <MobileMenuContent>
                    <MenuListMobile>
                        {this.props.items.map(item => (
                            <MenuItem key={item.url}>
                                <Link to={item.url} onClick={this.hide}>
                                    {item.title}
                                </Link>
                            </MenuItem>
                        ))}
                    </MenuListMobile>
                </MobileMenuContent>
            </MobileMenuContainer>
        );
    }

    topBar() {
        const { visible } = this.state;

        return (
            <MobileBar>
                <LeftBtn>
                    <Link to="/">
                        <Home />
                    </Link>
                </LeftBtn>
                <RightBtn>
                    <Hamburger checked={visible} onClick={this.toggleMenu} />
                </RightBtn>
                <RightBtn>
                    <Cart />
                </RightBtn>
            </MobileBar>
        );
    }

    render() {
        return (
            <div>
                {this.topBar()}
                {this.mobileMenu()}
            </div>
        );
    }
}

export default class Menu extends Component {
    render() {
        const { items } = this.props;

        return (
            <Fragment>
                <TopMenu items={items} />
                {/*<MobileMenu items={items} />*/}
            </Fragment>
        );
    }
}
