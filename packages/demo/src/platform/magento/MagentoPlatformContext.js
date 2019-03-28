// @flow
import React, { useEffect, useState } from 'react';
import { PlatformContext } from '../index.js';
import { Provider as ReduxProvider } from 'react-redux';

type Props = {
    children: any,
};

// SSR fix
let store = null;
let apiLayer = {
    loadCart: () => ({}),
};

if (typeof window !== 'undefined') {
    store = require('@magento/venia-concept/esm/store').default;
    apiLayer = require('./apiLayer').default;
}

const MagentoPlatformContext = ({ children }: Props) => {
    const [context, setContext] = useState({ store, apiLayer });
    const loadVenia = async () => {
        store = (await import('@magento/venia-concept/esm/store')).default;
        apiLayer = (await import('./apiLayer')).default;
        setContext({ store, apiLayer });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            loadVenia();
        }
    }, [false]);

    const body = (
        <PlatformContext.Provider value={apiLayer}>
            {children}
        </PlatformContext.Provider>
    );

    return context.store ? (
        <ReduxProvider store={store}>{body}</ReduxProvider>
    ) : (
        body
    );
};

export default MagentoPlatformContext;
