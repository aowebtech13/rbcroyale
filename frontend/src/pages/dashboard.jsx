import React from 'react';
import SEO from '../common/seo';
import DashboardMain from '../components/dashboard';
import Wrapper from '../layout/wrapper';
import ProtectedRoute from '../common/ProtectedRoute';

const DashboardPage = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <SEO pageTitle={"Dashboard | Lexicrone Finance"} />
                <DashboardMain />
            </Wrapper>
        </ProtectedRoute>
    );
};

export default DashboardPage;
