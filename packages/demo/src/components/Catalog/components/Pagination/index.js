import React from 'react';
import { Location, navigate } from '@reach/router';
import { parse, stringify } from 'query-string';
import Controls from './Controls';

const totalPages = 20;

const Pagination = () => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <Location>
            {({ location }) => {
                const search = parse(location.search);
                const page = parseInt(search.page || 1);

                const setPage = nextPage => {
                    if (page !== nextPage) {
                        const nextSearch = stringify({
                            ...search,
                            page: nextPage,
                        });
                        const path = `${location.pathname}?${nextSearch}`;
                        navigate(path);
                    }
                };

                return (
                    <Controls
                        currentPage={page}
                        totalPages={totalPages}
                        setPage={setPage}
                        tileBuffer={2}
                    />
                );
            }}
        </Location>
    );
};

export default Pagination;
