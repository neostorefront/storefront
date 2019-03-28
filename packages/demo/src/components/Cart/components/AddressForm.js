// @flow
import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import Fela from 'helpers/Fela';
import ProceedButton from './CheckoutProceedButton';
import {
    columnLayoutStyle,
    TheForm,
    FormRow,
    TextInput,
    FormView,
    DataRow,
    CheckboxInput,
    DropDown,
} from 'helpers/formComponents';
import Query from 'react-apollo/Query';
import gql from 'graphql-tag';
import Box from 'layout/Box';

const COUNTRIES_QUERY = gql`
    query {
        countries {
            id
            full_name
        }
    }
`;

const REGIONS_QUERY = gql`
    query($id: String!) {
        regions(country_id: $id) @client {
            code
            name
        }
    }
`;

/**
 * AddressForm Properties
 */
type Props = {
    data: Object,
    onSubmit: (address: Object) => void,
};

/**
 * AddressForm State
 */
type State = {};

const SubmittedAddress = props => <Fela style={columnLayoutStyle} {...props} />;

class AddressForm extends Component<Props, State> {
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

    renderAddress() {
        const { data } = this.state;

        return (
            <SubmittedAddress>
                <Box extend={{ padding: '0.8em' }}>
                    <FormView>
                        <FormRow rows={2}>
                            {data.firstName} {data.lastName}
                        </FormRow>
                        <FormRow rows={2}>{data.street}</FormRow>
                        <FormRow rows={2}>{data.street2}</FormRow>
                        <FormRow rows={2}>
                            {data.city}, {data.state} {data.postcode}
                        </FormRow>
                        <FormRow rows={2}>{data.phone}</FormRow>
                    </FormView>
                </Box>
                <ProceedButton
                    onClick={e => this.setState({ submitted: false })}
                >
                    Edit
                </ProceedButton>
            </SubmittedAddress>
        );
    }

    renderFields() {
        return (
            <FormView>
                {/*<FormRow>*/}
                {/*<Field*/}
                {/*name="newsletter"*/}
                {/*component={CheckboxInput}*/}
                {/*type="checkbox"*/}
                {/*label="Send me special offers!"*/}
                {/*/>*/}
                {/*</FormRow>*/}
                <FormRow rows={2}>
                    <Field
                        name="firstName"
                        component={TextInput}
                        type="text"
                        placeholder="First Name"
                    />
                </FormRow>
                <FormRow rows={2}>
                    <Field
                        name="lastName"
                        component={TextInput}
                        type="text"
                        placeholder="Last Name"
                    />
                </FormRow>
                <FormRow>
                    <Field
                        name="street"
                        component={TextInput}
                        type="text"
                        placeholder="Street Address"
                    />
                </FormRow>
                <FormRow>
                    <Field
                        name="street2"
                        component={TextInput}
                        type="text"
                        placeholder="Apt., Floor, Unit..."
                    />
                </FormRow>
                <FormRow>
                    <Field
                        name="city"
                        component={TextInput}
                        type="text"
                        placeholder="City"
                    />
                </FormRow>
                <FormRow>
                    <Query
                        query={REGIONS_QUERY}
                        variables={{
                            id: 'US',
                        }}
                    >
                        {({ data }) => {
                            // const options = data.countries.map(
                            //     ({ id: value, full_name: label }) => ({
                            //         label,
                            //         value,
                            //     })
                            // );

                            if (!data || !data.regions) {
                                return null;
                            }

                            const options = data.regions.map(
                                ({ code: value, name: label }) => ({
                                    label,
                                    value,
                                })
                            );

                            return (
                                <Field
                                    name="state"
                                    component={DropDown}
                                    type="text"
                                    placeholder="State"
                                    options={options}
                                />
                            );
                        }}
                    </Query>
                </FormRow>
                <FormRow>
                    <Field
                        name="postcode"
                        component={TextInput}
                        type="text"
                        placeholder="Postcode"
                    />
                </FormRow>
                <FormRow>
                    <Field
                        name="phone"
                        component={TextInput}
                        type="text"
                        placeholder="Phone"
                    />
                </FormRow>
                <FormRow>
                    <ProceedButton>Next</ProceedButton>
                </FormRow>
            </FormView>
        );
    }

    render() {
        const { data } = this.props;
        if (this.state.submitted) {
            return this.renderAddress();
        }
        return (
            <Form
                onSubmit={values => {
                    this.submit(values);
                }}
                initialValues={data}
            >
                {({ handleSubmit }) => {
                    return (
                        <TheForm onSubmit={handleSubmit}>
                            {this.renderFields()}
                        </TheForm>
                    );
                }}
            </Form>
        );
    }
}

export default AddressForm;
