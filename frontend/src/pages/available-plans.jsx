import React from 'react';
import SEO from '../common/seo';
import AvailablePlansMain from '../components/available-plans';
import Wrapper from '../layout/wrapper';
import ProtectedRoute from '../common/ProtectedRoute';

const AvailablePlansPage = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <SEO pageTitle={"Available Plans | Rcb Royale Bank"} />
                <AvailablePlansMain />
            </Wrapper>
        </ProtectedRoute>
    );
};

export default AvailablePlansPage;
