// @flow
import React, { useEffect } from 'react';
import Fela from 'helpers/Fela';
import Box from 'layout/Box';

export const columnLayoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '90%',
    width: '100%',
};

export const TheForm = props => (
    <Fela
        style={{
            ...columnLayoutStyle,
            phone: {
                padding: '0',
            },
        }}
        as="form"
        {...props}
    />
);

export const FormRow = props => (
    <Fela
        style={{
            desktop: {
                ...(props.rows > 1
                    ? {
                          gridColumnEnd: 'span 2',
                      }
                    : {
                          gridColumnEnd: 'span 1',
                      }),
            },
        }}
        {...props}
    />
);

export const FormCol = props => (
    <Fela
        style={{
            display: 'flex',
            flexGrow: 1,
            height: '100%',
        }}
        {...props}
    />
);

export const InputEl = ({ as = 'input', ...rest }) => (
    <Fela
        style={{
            padding: '1.2rem',
            borderRadius: '0.4rem',
            flexGrow: 1,
            border: 'solid 1px #ccc',
            transition: 'all 0.4s',
            ':focus': {
                outline: 'none',
                border: 'solid 1px #f2c862',
            },
        }}
        as={as}
        {...rest}
    />
);

export const SelectEl = ({ ...rest }) => (
    <Box
        {...rest}
        extend={{
            padding: '1.2rem',
            flexGrow: 1,
            borderRadius: '0.4rem',
            border: 'solid 1px #ccc',
            transition: 'all 0.4s',
            boxSizing: 'border-box',
            ':focus': {
                outline: 'none',
                border: 'solid 1px #f2c862',
            },
        }}
        as="select"
    />
);

export const TextInput = ({ meta, input, ...rest }) => (
    <FormCol>
        <InputEl {...input} {...rest} />
    </FormCol>
);

export const DropDown = ({ meta, input, options, ...rest }) => {
    useEffect(() => {
        if (!meta.data[input.name]) {
            options && options.length && input.onChange(options[0].value);
        }
    }, [false]);

    return (
        <FormCol>
            <SelectEl
                {...input}
                {...rest}
                value={input.value}
                onChange={e => {
                    input.onChange(e.target.value);
                }}
            >
                {options
                    ? options.map(option => (
                          <option
                              key={option.value + '-' + option.label}
                              value={option.value}
                          >
                              {option.label}
                          </option>
                      ))
                    : null}
            </SelectEl>
        </FormCol>
    );
};

export const FormView = props => (
    <Fela
        style={{
            width: '100%',
            display: 'grid',
            gridGap: '0.5em',
        }}
        {...props}
    />
);

export const DataRow = props => (
    <Fela
        style={{
            display: 'block',
            textTransform: 'none',
            padding: '0 2rem',
            margin: '5px',
        }}
        as="label"
        {...props}
    />
);

export const Label = props => (
    <Fela
        style={{
            textTransform: 'none',
        }}
        as="label"
        {...props}
    />
);

export const RadioButtonsBlock = props => (
    <Fela
        style={{
            display: 'flex',
            flexDirection: 'column',
        }}
        {...props}
    />
);

export const CheckboxInput = ({ meta, input, ...rest }) => (
    <FormCol>
        <Label>
            <InputEl {...input} {...rest} />
            {rest.label}
        </Label>
    </FormCol>
);
