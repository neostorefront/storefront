// @flow
import React, { Component } from 'react';
import { PlatformContext } from 'platform';
import { ApolloProvider } from 'react-apollo';
import client from 'platform/client';

/**
 * EcommercePlatform Properties
 */
type Props = {
    children: any,
};

/**
 * EcommercePlatform State
 */
type State = {};

/**
 */
export default class EcommercePlatform extends Component<Props, State> {
    static contextType = PlatformContext;

    async componentDidMount(): void {
        await this.context.loadCart();
    }

    render() {
        const { children } = this.props;
        return <ApolloProvider client={client}>{children}</ApolloProvider>;
    }
}
