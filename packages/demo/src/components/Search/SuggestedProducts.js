import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import SuggestedProduct from './SuggestedProduct';
import { FelaComponent } from 'react-fela';

const List = props => (
    <FelaComponent
        style={{
            padding: '0 1.5rem',
        }}
        as="ul"
        {...props}
    />
);

class SuggestedProducts extends Component {
    // static propTypes = {
    //     classes: PropTypes.shape({
    //         items: PropTypes.string,
    //         title: PropTypes.string,
    //         titleText: PropTypes.string
    //     }),
    //     items: PropTypes.arrayOf(PropTypes.object).isRequired,
    //     handleOnProductOpen: PropTypes.func.isRequired
    // };

    render() {
        const { items, handleOnProductOpen } = this.props;
        return (
            <div>
                <FelaComponent
                    as="h4"
                    style={{
                        paddingBottom: '1rem',
                        textTransform: 'uppercase',
                        display: 'block',
                        borderBottom: '2px solid #f0f0f0',
                        padding: '0.5rem 1.5rem',
                    }}
                >
                    <span>Product Suggestions</span>
                </FelaComponent>
                <List>
                    {items.map(item => (
                        <SuggestedProduct
                            key={item.id}
                            handleOnProductOpen={handleOnProductOpen}
                            {...item}
                        />
                    ))}
                </List>
            </div>
        );
    }
}

export default SuggestedProducts;
