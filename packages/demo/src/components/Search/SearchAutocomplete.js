import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import Query from 'react-apollo/Query';

// import { loadingIndicator } from 'src/components/LoadingIndicator';
import gql from 'graphql-tag';
import SuggestedCategories from './SuggestedCategories';
import SuggestedProducts from './SuggestedProducts';
import { FelaComponent } from 'react-fela';

const AutocompleteWrap = props => (
    <FelaComponent
        style={{
            textAlign: 'left',
            margin: '-0.5rem 0 0.5rem',
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',

            border: '1px solid rgb(var(--venia-border))',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white',
            zIndex: '2',
            padding: '1rem 0',
        }}
        as="div"
        {...props}
    />
);

const debounceTimeout = 200;
const suggestedCategoriesLimit = 4;
const suggestedProductsLimit = 3;

const PRODUCT_SEARCH = gql`
    query productSearch($inputText: String!, $categoryId: String) {
        products(
            search: $inputText
            filter: { category_id: { eq: $categoryId } }
        ) {
            items {
                id
                name
                url_key
                sku
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
            }
            total_count
            filters {
                name
                filter_items_count
                request_var
                filter_items {
                    label
                    value_string
                }
            }
        }
    }
`;

class SearchAutocomplete extends Component {
    state = {
        isQueryUpdating: false,
        autocompleteQuery: '',
    };

    /* Debounce this update in order to avoid multiple autocomplete query calls */
    updateAutocompleteQuery = debounce(value => {
        this.setState({
            autocompleteQuery: value,
            isQueryUpdating: false,
        });
    }, debounceTimeout);

    componentDidUpdate = prevProps => {
        const { searchQuery } = this.props;

        if (prevProps.searchQuery !== searchQuery) {
            this.setState({ isQueryUpdating: true });
            this.updateAutocompleteQuery(searchQuery);
        }
    };

    handleCategorySearch = event => {
        event.preventDefault();
        const { id } = event.currentTarget.dataset || event.srcElement.dataset;
        this.props.updateAutocompleteVisible(false);
        this.props.executeSearch(
            this.state.autocompleteQuery,
            this.props.history,
            id
        );
    };

    handleOnProductOpen = () => this.props.updateAutocompleteVisible(false);

    render() {
        const { autocompleteVisible } = this.props;
        const { handleOnProductOpen, handleCategorySearch } = this;
        const { autocompleteQuery, isQueryUpdating } = this.state;

        if (!autocompleteVisible || autocompleteQuery.length < 3) return null;

        return (
            <Query
                query={PRODUCT_SEARCH}
                variables={{
                    inputText: autocompleteQuery,
                }}
            >
                {({ loading, error, data }) => {
                    if (error)
                        return (
                            <div>
                                <div>Data Fetch Error</div>
                            </div>
                        );
                    if (loading || isQueryUpdating)
                        return (
                            <div>
                                <div>
                                    {/*{loadingIndicator}*/}
                                    {'Loading...'}
                                </div>
                            </div>
                        );

                    const { filters, items } = data.products;

                    if (items.length <= 0)
                        return (
                            <div>
                                <div>
                                    No results found, try a different search
                                </div>
                            </div>
                        );

                    const categoryFilter = filters.find(
                        filter => filter.name === 'Category'
                    );

                    const categorySuggestions = categoryFilter[
                        'filter_items'
                    ].slice(0, suggestedCategoriesLimit);

                    return (
                        <AutocompleteWrap>
                            <SuggestedCategories
                                handleCategorySearch={handleCategorySearch}
                                autocompleteQuery={autocompleteQuery}
                                categorySuggestions={categorySuggestions}
                            />
                            <SuggestedProducts
                                handleOnProductOpen={handleOnProductOpen}
                                items={items.slice(0, suggestedProductsLimit)}
                            />
                        </AutocompleteWrap>
                    );
                }}
            </Query>
        );
    }
}

export default SearchAutocomplete;
