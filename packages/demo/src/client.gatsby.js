import React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
const cache = new InMemoryCache();

let сlientGatsby = null;

const PRODUCTION = process.env.NODE_ENV === `production`;

if (typeof window !== 'undefined' && !PRODUCTION) {
    const apiBase = new URL(
        '/___graphql',
        typeof location !== 'undefined' ? location.origin : 'http://localhost/'
    ).toString();

    const httpLink = createHttpLink({
        uri: apiBase,
    });

    сlientGatsby = new ApolloClient({
        link: httpLink,
        cache,
    });
}

export default сlientGatsby;
