import React from 'react';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import FaqArea from '../homes/home-2/faq-area';
import Breadcrumb from '../../common/breadcrumbs/breadcrumb';

const FaqMain = () => {
    return (
        <>
            <HeaderSix style_2={true} />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="fix">
                        <Breadcrumb title_top="Frequently Asked" title_bottom="Questions" />
                        <FaqArea style_service={true} />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default FaqMain;
