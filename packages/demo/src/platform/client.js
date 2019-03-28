import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import mutations from './mutations';
import queries from './queries';
import typeDefs from './schema.graphql';

if (typeof window === 'undefined') {
    global.fetch = () => {};
}

export const cache = new InMemoryCache();

if (typeof window !== 'undefined') {
    persistCache({
        cache,
        storage: window.sessionStorage,
    });
}

const client = new ApolloClient({
    cache,
    clientState: {
        defaults: {
            isConnected: true,
            totals: {
                subtotal: 0,
                tax: 0,
                shipping: 0,
                total: 0,
                itemsQty: 0,
                __typename: 'Totals',
            },
            cart: [],
            email: '',
            shippingMethods: [],
            countries: [],
            shippingAddress: {
                city: '',
                firstName: '',
                lastName: '',
                phone: '',
                postcode: '',
                state: '',
                street: '',
                street2: '',
                __typename: 'Address',
            },
            billingAddress: {
                city: '',
                firstName: '',
                lastName: '',
                phone: '',
                postcode: '',
                state: '',
                street: '',
                street2: '',
                __typename: 'Address',
            },
        },
        resolvers: {
            Mutation: mutations,
            Query: queries,
        },
        typeDefs,
    },
});

export default client;
