import React from 'react';
import SEO from '../common/seo';
import FaqMain from '../components/faq';
import Wrapper from '../layout/wrapper';
import ProtectedRoute from '../common/ProtectedRoute';

const FaqPage = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <SEO pageTitle={"FAQ | Lexicrone Finance"} />
                <FaqMain />
            </Wrapper>
        </ProtectedRoute>
    );
};

export default FaqPage;
