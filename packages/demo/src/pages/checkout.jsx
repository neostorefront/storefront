import React from 'react';
import Layout from 'components/Layout';
import Box from 'layout/Box';
import { withTheme } from 'react-fela';
import Steps from 'components/Checkout/Steps';
import Totals from 'components/Cart/components/Totals';
import { stepTitleStyle } from 'components/Checkout/Steps/components/Step.css';

export const CheckoutContainer = withTheme(({ theme, children }) => (
    <Box
        flex
        extend={[
            {
                flexDirection: 'row',
                phone: {
                    flexDirection: 'column',
                },
            },
            theme.page.contentWidth,
        ]}
    >
        {children}
    </Box>
));

const Checkout = () => (
    <Layout>
        <CheckoutContainer>
            <Box
                direction="column"
                flex="grow"
                extend={{
                    phone: {},
                }}
            >
                <Steps />
            </Box>
            <Box
                direction="column"
                flex
                extend={{
                    minWidth: '30%',
                }}
            >
                <Box
                    extend={{
                        ...stepTitleStyle,
                        textAlign: 'center',
                        display: 'block',
                    }}
                >
                    Order Summary
                </Box>
                {/*<CartContents skipHeader={true} />*/}
                <Totals />
            </Box>
        </CheckoutContainer>
    </Layout>
);

export default Checkout;
