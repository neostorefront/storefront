import React, { Component } from 'react';
import { arrayOf, func, object, shape, string } from 'prop-types';

import SwatchList from './swatchList';
import TileList from './tileList';
import Box from 'layout/Box';

const getItemKey = ({ value_index }) => value_index;

const optionStyle = {
    borderBottom: '1px solid #eee',
    margin: '0 1.5rem',
    padding: '1.75rem 0',
};
class Option extends Component {
    static propTypes = {
        attribute_id: string,
        attribute_code: string.isRequired,
        label: string.isRequired,
        onSelectionChange: func,
        values: arrayOf(object).isRequired,
    };

    handleSelectionChange = selection => {
        const { attribute_id, onSelectionChange } = this.props;

        if (onSelectionChange) {
            onSelectionChange(attribute_id, selection);
        }
    };

    get listComponent() {
        const { attribute_code } = this.props;

        // TODO: get an explicit field from the API
        // that identifies an attribute as a swatch
        return attribute_code === 'color' ? SwatchList : TileList;
    }

    render() {
        const { handleSelectionChange, listComponent: ValueList, props } = this;
        const { label, values } = props;

        return (
            <Box flex extend={optionStyle} direction={'column'}>
                <Box as="h3">
                    <span>{label}</span>
                </Box>
                <Box
                    extend={{
                        marginLeft: '-1rem',
                    }}
                >
                    <ValueList
                        getItemKey={getItemKey}
                        items={values}
                        onSelectionChange={handleSelectionChange}
                    />
                </Box>
            </Box>
        );
    }
}

export default Option;
