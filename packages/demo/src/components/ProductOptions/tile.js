import React, { Component } from 'react';
import { bool, number, shape, string } from 'prop-types';
import Box from 'layout/Box';

const getClassName = (name, isSelected, hasFocus) =>
    `${name}${isSelected ? '_selected' : ''}${hasFocus ? '_focused' : ''}`;

const tileStyle = isSelected => ({
    height: '3rem',
    minWidth: '3rem',
    borderRadius: '2px',
    backgroundColor: isSelected ? 'black' : 'white',
    borderColor: 'black',
    color: isSelected ? 'white' : 'black',
    padding: '0',
    marginLeft: '1rem',
    marginTop: '1rem',
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    lineHeight: 1,
    pointerEvents: 'auto',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontSize: '1.5rem',
});

class Tile extends Component {
    static propTypes = {
        hasFocus: bool,
        isSelected: bool,
        item: shape({
            label: string.isRequired,
        }).isRequired,
        itemIndex: number,
    };

    static defaultProps = {
        hasFocus: false,
        isSelected: false,
    };

    render() {
        const {
            classes,
            hasFocus,
            isSelected,
            item,
            // eslint-disable-next-line
            itemIndex,
            ...restProps
        } = this.props;

        const { label } = item;
        return (
            <Box as="button" extend={tileStyle(isSelected)} props={restProps}>
                <span>{label}</span>
            </Box>
        );
    }
}

export default Tile;
