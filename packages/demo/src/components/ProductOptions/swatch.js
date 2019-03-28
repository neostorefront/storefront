import React, { Component } from 'react';
import { bool, number, object, oneOfType, shape, string } from 'prop-types';

import CheckIcon from 'react-feather/dist/icons/check';
import Box from 'layout/Box';

function mapColor(label) {
    const id = label.toLowerCase();

    const map = {
        black: '#000',
        white: '#fff',
        blue: 'blue',
        green: 'green',
        red: 'red',
        gray: 'gray',
        orange: 'orange',
        yellow: 'yellow',
        purple: 'purple',
    };

    return map[id] ? map[id] : 'white';
}

const swatchStyle = (isSelected, color) => ({
    height: '3rem',
    minWidth: '3rem',
    borderRadius: '2px',
    backgroundColor: color,
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

class Swatch extends Component {
    static propTypes = {
        hasFocus: bool,
        isSelected: bool,
        item: shape({
            label: string.isRequired,
            value_index: oneOfType([number, string]).isRequired,
        }).isRequired,
        itemIndex: number,
        style: object,
    };

    static defaultProps = {
        hasFocus: false,
        isSelected: false,
    };

    get icon() {
        const { isSelected } = this.props;

        return isSelected ? <CheckIcon /> : null;
    }

    render() {
        const { icon, props } = this;
        const {
            classes,
            hasFocus,
            isSelected,
            item,
            // eslint-disable-next-line
            itemIndex,
            style,
            ...restProps
        } = props;
        // const className = classes[getClassName('root', isSelected, hasFocus)];
        const { label, value_index } = item;

        return (
            <Box
                extend={swatchStyle(isSelected, mapColor(label))}
                props={{ ...restProps, title: label }}
                as="button"
            >
                {icon}
            </Box>
        );
    }
}

export default Swatch;
