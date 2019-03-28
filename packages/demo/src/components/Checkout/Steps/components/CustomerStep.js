// @flow
import React, { Component } from 'react';
import LoginForm from 'components/Account/LoginForm';
import EmailForm from 'components/Account/EmailForm';
import gql from 'graphql-tag';
import Query from 'react-apollo/Query';
import client from 'platform/client';

/**
 * CustomerStep Properties
 */
type Props = {
    onContinue: () => void,
};

/**
 * CustomerStep State
 */
type State = {};

const EMAIL_QUERY = gql`
    query {
        email @client
    }
`;

/**
 */
export default class CustomerStep extends Component<Props, State> {
    switchToLoginHandler = () => {};

    setEmail(email: String) {
        const mutation = gql`
            mutation UpdateEmail($email: String!) {
                setEmail(email: $email) @client
            }
        `;

        client.mutate({
            mutation,
            variables: {
                email,
            },
        });
    }

    render() {
        return (
            <Query query={EMAIL_QUERY}>
                {({ data }) => {
                    return (
                        <>
                            {/*<LoginForm*/}
                            {/*onSubmit={user => {*/}
                            {/*console.log('User: ', user);*/}
                            {/*}}*/}
                            {/*/>*/}
                            <EmailForm
                                data={data}
                                onSubmit={email => {
                                    this.setEmail(email.email);
                                    this.props.onContinue();
                                }}
                                switchToLogin={this.switchToLoginHandler}
                            />
                        </>
                    );
                }}
            </Query>
        );
    }
}
