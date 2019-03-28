import React from 'react';
import Box from 'layout/Box';
import Layout from 'components/Layout';
import LoginForm from 'components/Account/LoginForm';

const Login = props => (
    <Layout>
        <Box>
            <LoginForm
                onSubmit={user => {
                    console.log('User: ', user);
                }}
            />
        </Box>
    </Layout>
);

export default Login;
