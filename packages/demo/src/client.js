import React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const apiBase = new URL(
    '/graphql',
    typeof location !== 'undefined' ? location.origin : 'http://localhost/'
).toString();

const httpLink = createHttpLink({
    uri: apiBase,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: cache,
});

export default apolloClient;
