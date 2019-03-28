import React from 'react';
import Box from 'layout/Box';
import Layout from 'components/Layout';
import AccountForm from 'components/Account/AccountForm';

const Create = props => (
    <Layout>
        <Box>
            <AccountForm
                onSubmit={user => {
                    console.log('User: ', user);
                }}
            />
        </Box>
    </Layout>
);

export default Create;
