import React from 'react';
import Layout from 'components/Layout';
import Box from 'layout/Box';
import Head from 'components/head';
import Title from 'components/title';
import { withTheme } from 'react-fela';

export const Wrap = withTheme(({ theme, children }: any) => (
    <Box
        extend={[
            {
                justifyContent: 'center',
                display: 'block',
                tablet: {
                    display: 'block',
                },
                desktop: {
                    display: 'block',
                },
            },
            theme.page.contentWidth,
        ]}
    >
        {children}
    </Box>
));

const Success = ({ data }) => (
    <Layout>
        <div>
            <Wrap>
                <Head pageTitle={'Success!'} />
                <Box extend={{ paddingTop: '25vh' }}>
                    <Title>Success!</Title>
                    <Box extend={{ padding: '1em 5em 5em 5em' }}>
                        Thank you for your order. Once your package ships we
                        will send an email with a link to track your order. If
                        you have questions about your order, you can email us at{' '}
                        <a href="mailto:support@example.com">
                            support@example.com
                        </a>
                        .
                    </Box>
                </Box>
            </Wrap>
        </div>
    </Layout>
);

Success.propTypes = {};

export default Success;
