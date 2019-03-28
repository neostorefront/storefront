import React from 'react';
import wrapPageElementWithTransition from 'helpers/wrapPageElement';
import { RendererProvider, ThemeProvider } from 'react-fela';
import { createRenderer } from 'fela';
import { rehydrate } from 'fela-dom';
import config from './fela.config.js';
import theme from './fela.theme.js';
import globalStyle from 'global.css.js';

const isProduction = process.env.NODE_ENV === 'production'

// React Context in Browser
// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
    const renderer = createRenderer(config);

    if(isProduction) {
        rehydrate(renderer)
    } else {
        renderer.renderStatic(globalStyle)
    }

    return (
        <RendererProvider renderer={renderer}>
            <ThemeProvider theme={theme}>{element}</ThemeProvider>
        </RendererProvider>
    );
};

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;
