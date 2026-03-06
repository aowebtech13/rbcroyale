import React from 'react';
import SEO from '../common/seo';
import Wrapper from '../layout/wrapper';
import ProtectedRoute from '../common/ProtectedRoute';
import WithdrawMain from '../components/withdraw';

const WithdrawPage = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <SEO pageTitle={"Withdraw Funds | Lexicrone Finance"} />
                <WithdrawMain />
            </Wrapper>
        </ProtectedRoute>
    );
};

export default WithdrawPage;
