import React from 'react';
import Animate from 'layout/Animate';

const animationName = props => ({
    from: {},
    to: {},
});

const animationNameClose = props => ({
    from: {},
    to: {},
});

const StepAnimator = props => (
    <Animate
        {...props}
        style={{
            animationDuration: '0.3s',
            animationFillMode: 'both',
            background: '#fff',
        }}
        keyframes={props.closing ? animationNameClose : animationName}
    />
);

export default StepAnimator;
