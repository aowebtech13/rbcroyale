import React from 'react';
import SEO from '../common/seo';
import TransactionsMain from '../components/transactions';
import Wrapper from '../layout/wrapper';
import ProtectedRoute from '../common/ProtectedRoute';

const TransactionsPage = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <SEO pageTitle={"Transaction History | Lexicrone Finance"} />
                <TransactionsMain />
            </Wrapper>
        </ProtectedRoute>
    );
};

export default TransactionsPage;
