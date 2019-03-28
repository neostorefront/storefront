// @flow
import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import SubmitButton from '../Cart/components/SubmitButton';
import {
    TheForm,
    FormRow,
    TextInput,
    FormView,
} from '../../helpers/formComponents';

/**
 * AccountForm Properties
 */
type Props = {
    onSubmit: (account: Object) => void,
};

/**
 * AccountForm State
 */
type State = {};

class AccountForm extends Component<Props, State> {
    state = {
        submitted: false,
        data: null,
    };

    submit(data: Object) {
        this.setState({
            submitted: true,
            data,
        });
        this.props.onSubmit(data);
    }

    render() {
        return (
            <Form
                onSubmit={values => {
                    this.submit(values);
                }}
            >
                {({ handleSubmit }) => {
                    return (
                        <TheForm onSubmit={handleSubmit}>
                            <FormView>
                                <h3>
                                    {'An account gives you access to rewards!'}
                                </h3>
                                <FormRow>
                                    <Field
                                        name="email"
                                        component={TextInput}
                                        type="text"
                                        placeholder="Email Address"
                                    />
                                </FormRow>
                                <FormRow>
                                    <Field
                                        name="firstName"
                                        component={TextInput}
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </FormRow>
                                <FormRow>
                                    <Field
                                        name="lastName"
                                        component={TextInput}
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </FormRow>
                                <FormRow>
                                    <Field
                                        name="password"
                                        component={TextInput}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </FormRow>
                                <FormRow>
                                    <Field
                                        name="confirmPassword"
                                        component={TextInput}
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                </FormRow>
                            </FormView>
                            <SubmitButton>Submit</SubmitButton>
                        </TheForm>
                    );
                }}
            </Form>
        );
    }
}

export default AccountForm;
