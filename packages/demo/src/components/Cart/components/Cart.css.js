import React, { Fragment } from 'react';
import { FelaComponent } from 'react-fela';
import { media } from './media.css';
import Animate from 'layout/Animate';

const animationFadeIn = props => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
});

const animationNone = props => ({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(100%)' },
});

const animationName = props => ({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0%)' },
});

const animationNameClose = props => ({
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(100%)' },
});

export const DrawerBg = props => (
    <Animate
        {...props}
        style={{
            animationDuration: '0.3s',
            animationFillMode: 'both',
            position: 'fixed',
            background: 'rgba(20,20,20,0.5)',
            zIndex: 99,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        }}
        keyframes={animationFadeIn}
    />
);

export const DrawerSide = props => (
    <Animate
        {...props}
        style={{
            animationDuration: '0.3s',
            animationFillMode: 'both',
            position: 'fixed',
            background: '#fff',
            zIndex: 100,
            minWidth: '30vw',
            right: 0,
            bottom: 0,
            top: 0,
            borderLeft: 'solid 1px #ccc',
            tablet: { minWidth: '50vw' },
            phone: { minWidth: '80vw' },


        }}
        keyframes={
            props.touched
                ? props.closing
                    ? animationNameClose
                    : animationName
                : animationNone
        }
    />
);

export const Drawer = props => (
    <>
        {!props.closing && <DrawerBg onClick={props.onClose} />}
        <DrawerSide closing={props.closing} touched={props.touched}>
            {props.children}
        </DrawerSide>
    </>
);

export const CartView = ({ children, ...props }) => (
    <FelaComponent
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            '& h3': {
                textAlign: 'center',
                paddingTop: '0.5em',
                paddingBottom: '0.5em',
                fontSize: '2em',
            },
            '& p': {
                textAlign: 'center',
                textTransform: 'none',
            },
        }}
    >
        {({ className }) => (
            <div {...props} className={className}>
                {children}
            </div>
        )}
    </FelaComponent>
);
