import React from 'react';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import WithdrawArea from './withdraw-area';

const Withdraw = () => {
    return (
        <>
            <HeaderSix style_2={true} />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="fix">
                        <WithdrawArea />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Withdraw;
