import React from 'react';
import { renderToString } from 'react-dom/server';
import { RendererProvider, ThemeProvider } from 'react-fela';
import { createRenderer } from 'fela';
import { renderToSheetList } from 'fela-dom';
import config from './fela.config.js';
import theme from './fela.theme.js';
import globalStyle from 'global.css';

export const replaceRenderer = (
    { bodyComponent, replaceBodyHTMLString, setHeadComponents },
    pluginOptions
) => {
    const renderer = createRenderer(config)
    renderer.renderStatic(globalStyle)

    const bodyHTML = renderToString(
        <RendererProvider renderer={renderer}>
            <ThemeProvider theme={theme}>{bodyComponent}</ThemeProvider>
        </RendererProvider>
    )

    const sheetList = renderToSheetList(renderer)
    const elements = sheetList.map(({ type, css, media, support }) => (
        <style
            dangerouslySetInnerHTML={{ __html: css }}
            data-fela-type={type}
            data-fela-support={support}
            key={`${type}-${media}`}
            media={media}
        />
    ))
    replaceBodyHTMLString(bodyHTML)
    setHeadComponents(elements)
}
