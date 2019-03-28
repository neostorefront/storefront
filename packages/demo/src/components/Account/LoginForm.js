// @flow
import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import SubmitButton from '../Cart/components/SubmitButton';
import {
    TheForm,
    FormRow,
    TextInput,
    FormView,
    CheckboxInput,
} from 'helpers/formComponents';

/**
 * LoginForm Properties
 */
type Props = {
    onSubmit: (login: Object) => void,
};

/**
 * LoginForm State
 */
type State = {};

class LoginForm extends Component<Props, State> {
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
                                <FormRow>
                                    <Field
                                        name="login"
                                        component={TextInput}
                                        type="text"
                                        placeholder="Login"
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
                                        name="rememberMe"
                                        component={CheckboxInput}
                                        type="checkbox"
                                        label="Remember me!"
                                    />
                                </FormRow>
                            </FormView>
                            <SubmitButton>Login</SubmitButton>
                        </TheForm>
                    );
                }}
            </Form>
        );
    }
}

export default LoginForm;
