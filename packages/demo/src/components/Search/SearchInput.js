import React, { Component } from 'react';
import Search from 'react-feather/dist/icons/search';
import { parse } from 'query-string';
import Fela from 'helpers/Fela';
import { navigate, Location } from '@reach/router';
import SearchAutocomplete from './SearchAutocomplete';
import Box from 'layout/Box';

const searchForm = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
};

const searchWrapper = {
    position: 'relative',
    alignSelf: 'center',
    width: '100%',
    display: 'flex',
    desktop: {
        maxWidth: '420px',
    },
    tablet: {
        maxWidth: '420px',
    },
};

const searchInput = {
    padding: '0.8rem',
    paddingRight: '46px',
    borderRadius: '0.4rem',
    flexGrow: 1,
    border: 'solid 2px rgba(66,33,0,0.5)',
    transition: 'all 0.4s',
    fontSize: '1em',
    ':focus': {
        outline: 'none',
        border: 'solid 2px rgb(118, 54, 121)',
    },
};

const searchBtn = {
    position: 'absolute',
    backgroundColor: '#fff',
    border: 'none',
    padding: '0 10px',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '2px',
    cursor: 'pointer',
    outline: 'none',
};

const extractSearch = location => {
    const { q } = parse(location.search);

    return q;
};

export default class SearchInput extends Component {
    state = {
        searchTerm: '',
        autocompleteVisible: false,
    };

    updateTerm = event => {
        const term = event.target.value;

        this.setState({
            searchTerm: term.trim(),
        });

        if (term) {
            this.handleInputChange();
        }
    };

    updateAutocompleteVisible = visible => {
        this.setState({
            autocompleteVisible: visible,
        });
    };

    handleInputChange = () => this.updateAutocompleteVisible(true);

    toSearchPage = event => {
        event.preventDefault();
        const { searchTerm } = this.state;

        navigate(`/catalogsearch/result?q=${encodeURIComponent(searchTerm)}`);
    };

    render() {
        const { searchTerm, autocompleteVisible } = this.state;
        return (
            <Location>
                {({ location }) => (
                    <Fela
                        style={searchForm}
                        onSubmit={this.toSearchPage}
                        as="form"
                    >
                        <Box extend={{ padding: '0.5em', width: '60%', flexDirection: 'column' }}>
                            <Fela style={searchWrapper}>
                                <Fela
                                    style={searchInput}
                                    as="input"
                                    type="text"
                                    defaultValue={extractSearch(location)}
                                    onChange={this.updateTerm}
                                />

                                <Fela
                                    style={searchBtn}
                                    as="button"
                                    type="submit"
                                >
                                    <Search color="#a08f7f" size={22} />
                                </Fela>
                            </Fela>
                        </Box>
                        <SearchAutocomplete
                            searchQuery={searchTerm}
                            updateAutocompleteVisible={
                                this.updateAutocompleteVisible
                            }
                            autocompleteVisible={autocompleteVisible}
                        />
                    </Fela>
                )}
            </Location>
        );
    }
}
