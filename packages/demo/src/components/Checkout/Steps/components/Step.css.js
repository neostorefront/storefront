import React from 'react';
import Animate from 'layout/Animate';
import { media } from '../../../Cart/components/media.css';
import { Fragment } from 'react';

const animationName = props => ({
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0%)' },
});

const animationNameClose = props => ({
    from: { transform: 'translateY(0%)' },
    to: { transform: 'translateY(100%)' },
});

export const stepTitleStyle = {
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1.6em',
    marginTop: '0.5em',
    marginBottom: '0.5em',
    desktop: {
        fontSize: '1.4em',
    },
    tablet: {
        fontSize: '1.4em',
    },
};

const DrawerTop = props => (
    <Animate
        {...props}
        style={{
            animationDuration: '0.3s',
            animationFillMode: 'both',
            position: 'relative',
            background: '#fff',
            zIndex: 100,
            ...media.tablet({ minWidth: '50vw' }),
            ...media.phone({ minWidth: '80vw' }),
        }}
        keyframes={props.closing ? animationNameClose : animationName}
    />
);

const Drawer = props => (
    <Fragment>
        <DrawerTop closing={props.closing}>{props.children}</DrawerTop>
    </Fragment>
);

export default Drawer;
