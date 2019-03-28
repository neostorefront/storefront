// @flow
import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import {
    TheForm,
    FormRow,
    TextInput,
    FormView,
} from '../../helpers/formComponents';
import EmailButton from '../Cart/components/EmailButton';
import { LinkedSpan } from '../Cart/components/styles.css';
import Box from 'layout/Box';
import { withTheme } from 'react-fela';
import ProceedButton from 'components/Cart/components/CheckoutProceedButton';

/**
 * LoginForm Properties
 */
type Props = {
    onSubmit: (email: Object) => void,
    switchToLogin: Function,
    data: Object,
    theme: Object,
};

/**
 * LoginForm State
 */
type State = {};

class EmailForm extends Component<Props, State> {
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
        const { data } = this.props;
        return (
            <Form
                onSubmit={values => {
                    this.submit(values);
                }}
                initialValues={data}
            >
                {({ handleSubmit }) => {
                    return (
                        <Box
                            extend={{
                                maxWidth: '50%',
                                phone: { maxWidth: '100%' },
                            }}
                        >
                            <TheForm onSubmit={handleSubmit}>
                                <FormView>
                                    <FormRow rows={2}>
                                        <Field
                                            name="email"
                                            component={TextInput}
                                            type="email"
                                            placeholder="Email Address"
                                        />
                                    </FormRow>
                                    <FormRow rows={2}>
                                        <ProceedButton>
                                            Continue As A Guest
                                        </ProceedButton>
                                    </FormRow>
                                    <FormRow rows={2}>
                                        <Box extend={{ padding: '1em' }}>
                                            Already have an account?{' '}
                                            <LinkedSpan
                                                onClick={
                                                    this.props.switchToLogin
                                                }
                                            >
                                                Sign in now
                                            </LinkedSpan>
                                        </Box>
                                    </FormRow>
                                </FormView>
                            </TheForm>
                        </Box>
                    );
                }}
            </Form>
        );
    }
}

export default withTheme(EmailForm);
