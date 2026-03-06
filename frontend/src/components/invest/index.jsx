import React from 'react';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import InvestArea from './invest-area';
import { useRouter } from 'next/router';

const Invest = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <HeaderSix style_2={true} />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="fix">
                        <InvestArea planId={id} />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Invest;
