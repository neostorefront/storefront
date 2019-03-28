// @flow
import React, { Component } from 'react';

const Currency = props => (
    <span>
        {props.value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })}
    </span>
);

export default Currency;
