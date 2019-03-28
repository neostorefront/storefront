import React, { Component } from 'react';
import { Plus, Minus, Trash2 as X } from 'react-feather/dist';
import { SmallButton } from './styles.css';
import { PlatformContext } from 'platform';
import { update } from 'timm';
import Box from 'layout/Box';

const buttonWrapperStyle = {
    cursor: 'pointer',
    background: '#f0f0f0',
    borderRadius: '3px',
    margin: '0 5px',
    alignItems: 'center',
    transition: 'all 0.4s',
    padding: '0 0.3em',
    '>svg': {
        stroke: '#999',
    },
    ':hover': {
        background: '#f9f9f9',
        '>svg': {
            stroke: '#333',
        },
    },
};

const QuantityInput = props => (
    <Box
        extend={{
            padding: '0.3rem',
            textAlign: 'center',
            borderRadius: '0.4rem',
            border: 'solid 2px #ccc',
            transition: 'all 0.4s',
            width: '6rem',
            ':focus': {
                outline: 'none',
                border: 'solid 2px #F2C862',
            },
        }}
        as="input"
        props={props}
    />
);

class CartItemQuantity extends Component {
    static contextType = PlatformContext;

    state = {
        quantity: +this.props.item.qty,
    };

    updateItem = quantity => {
        const updatedItem = { ...this.props.item, qty: quantity };
        this.context.updateItem(updatedItem);
        this.props.onClose();
    };

    increaseQuantity = () => {
        this.setState(
            prevState => {
                return { quantity: +prevState.quantity + 1 };
            },
            () => this.updateItem(this.state.quantity)
        );
    };

    decreaseQuantity = () => {
        this.setState(
            prevState => {
                if (this.state.quantity > 0) {
                    return { quantity: +prevState.quantity - 1 };
                }
            },
            () => this.updateItem(this.state.quantity)
        );
    };

    changeValueHandler = e => {
        this.setState({ quantity: +e.target.value }, () =>
            this.updateItem(this.state.quantity)
        );
    };

    deleteItemHandler = () => {
        this.updateItem(0);
    };

    render() {
        const { quantity } = this.state;
        return (
            <Box>
                <Box>
                    <Box extend={buttonWrapperStyle}>
                        <Plus
                            size={22}
                            color="#000"
                            onClick={this.increaseQuantity}
                        />
                    </Box>
                    <QuantityInput
                        value={quantity}
                        type="text"
                        onChange={e => this.changeValueHandler(e)}
                    />
                    <Box extend={buttonWrapperStyle}>
                        <Minus
                            size={22}
                            color="#000"
                            onClick={this.decreaseQuantity}
                        />
                    </Box>
                </Box>
                <SmallButton
                    onClick={this.deleteItemHandler}
                    style={{ background: '#f9f9f9' }}
                >
                    <X />
                </SmallButton>
            </Box>
        );
    }
}

export default CartItemQuantity;
