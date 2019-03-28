import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classify from 'src/classify';
import { Link } from 'gatsby';
import { FelaComponent } from 'react-fela';
// import defaultClasses from './suggestedCategories.css';

const List = props => (
    <FelaComponent
        style={{
            padding: '0 1.5rem 1rem',
        }}
        as="ul"
        {...props}
    />
);

class SuggestedCategories extends Component {
    // static propTypes = {
    //     handleCategorySearch: PropTypes.func.isRequired,
    //     autocompleteQuery: PropTypes.string.isRequired,
    //     classes: PropTypes.shape({
    //         root: PropTypes.string,
    //         item: PropTypes.string
    //     }),
    //     categorySuggestions: PropTypes.arrayOf(
    //         PropTypes.shape({
    //             value_string: PropTypes.string,
    //             label: PropTypes.string
    //         })
    //     ).isRequired
    // };

    render() {
        const {
            handleCategorySearch,
            // classes,
            autocompleteQuery,
            categorySuggestions,
        } = this.props;

        return (
            <List>
                {categorySuggestions.map(item => (
                    <li key={item.value_string}>
                        <Link
                            onClick={handleCategorySearch}
                            data-id={item.value_string}
                            to="/search.html"
                        >
                            <strong>{autocompleteQuery}</strong> in {item.label}
                        </Link>
                    </li>
                ))}
            </List>
        );
    }
}

export default SuggestedCategories;
