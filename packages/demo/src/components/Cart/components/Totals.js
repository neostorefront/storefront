// @flow
import React, { Component } from 'react';
import Fela from 'helpers/Fela';
import { CheckoutButton } from './styles.css';
import CART_ITEMS_COUNT from './cart.graphql';
import Query from 'react-apollo/Query';
import gql from 'graphql-tag';
import Currency from './Currency';

/**
 * Totals Properties
 */
type Props = {
    onCheckout?: () => void,
};

/**
 * Totals State
 */
type State = {};

const TotalsBlock = props => (
    <Fela
        {...props}
        style={{
            width: '100%',
            bottom: 0,
            lineHeight: '2.2em',
            textTransform: 'none',
            paddingBottom: '3em',
            '& hr': {
                border: 'none',
                height: '1px',
                background: '#888',
                clear: 'both',
            },
        }}
    />
);

const Label = props => (
    <Fela
        {...props}
        style={{
            float: 'left',
        }}
    />
);

const Line = props => (
    <Fela
        {...props}
        style={{
            padding: '0 2em',
            clear: 'both',
        }}
    />
);

const Value = props => (
    <Fela
        {...props}
        style={{
            float: 'right',
        }}
    />
);

const Entry = props => (
    <Line>
        <Label>{props.title}</Label>
        <Value>
            <Currency value={props.value} />
        </Value>
    </Line>
);

const ProceedButton = props => (
    <CheckoutButton
        {...props}
        style={{
            width: '100%',
            borderRadius: 0,
            border: 'none',
            background: '#f0f0f0',
            fontWeight: 'bold',
            color: '#444',
            padding: '1em 0',
        }}
    />
);

const TOTALS_QUERY = gql`
    {
        totals {
            subtotal
            tax
            shipping
            total
        }
    }
`;

/**
 */
export default class Totals extends Component<Props, State> {
    render() {
        return (
            <Query query={TOTALS_QUERY}>
                {({ data }) => {
                    const { totals } = data;
                    const { onCheckout } = this.props;
                    return (
                        <TotalsBlock>
                            <Entry title="Subtotal" value={totals.subtotal} />
                            <Entry title="Tax" value={totals.tax} />
                            <Entry title="Shipping" value={totals.shipping} />
                            <Line>
                                <hr />
                            </Line>
                            <Entry title="Total" value={totals.total} />
                            {onCheckout ? (
                                <Line>
                                    <ProceedButton onClick={onCheckout}>
                                        Proceed
                                    </ProceedButton>
                                </Line>
                            ) : null}
                        </TotalsBlock>
                    );
                }}
            </Query>
        );
    }
}
