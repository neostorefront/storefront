import gql from 'graphql-tag';

export default {
    regions: (obj, { country_id }, { cache }) => {
        const query = gql`
            query GetCountries {
                countries @client {
                    id
                    regions {
                        ... on Region {
                            id
                            code
                            name
                        }
                    }
                }
            }
        `;

        const { countries = [] } = cache.readQuery({ query });

        for (const country of countries) {
            if (country.id === country_id) {
                return country.regions;
            }
        }

        return [];
    },
};
