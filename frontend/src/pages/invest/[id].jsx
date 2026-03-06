import React from 'react';
import SEO from '../../common/seo';
import InvestMain from '../../components/invest';
import Wrapper from '../../layout/wrapper';
import ProtectedRoute from '../../common/ProtectedRoute';

const InvestPage = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <SEO pageTitle={"Invest | Lexicrone Finance"} />
                <InvestMain />
            </Wrapper>
        </ProtectedRoute>
    );
};

export default InvestPage;
