import React from 'react';
import ProfileArea from './profile-area';

import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';

const ProfileMain = () => {
    return (
        <>
            <HeaderSix style_2={true} />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="fix">
                       
                        <ProfileArea />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default ProfileMain;
