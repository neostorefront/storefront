// @flow
import { Children, isValidElement } from 'react';

export const mapChildren = (nodes, handler, ctx) => {
    let idx = 0;
    return Children.map(nodes, child => {
        return isValidElement(child) ? handler.call(ctx, child, idx++) : child;
    });
};
