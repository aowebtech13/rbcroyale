import React from 'react';
import SEO from '../common/seo';
import ProfileMain from '../components/profile';
import Wrapper from '../layout/wrapper';
import ProtectedRoute from '../common/ProtectedRoute';

const ProfilePage = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <SEO pageTitle={"My Profile | Lexicrone Finance"} />
                <ProfileMain />
            </Wrapper>
        </ProtectedRoute>
    );
};

export default ProfilePage;
