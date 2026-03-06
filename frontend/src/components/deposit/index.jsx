import React from 'react';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import dynamic from 'next/dynamic';
import PaymentArea from '../homes/home-2/payment-area';

const DepositArea = dynamic(() => import('./deposit-area'), { ssr: false });

const Deposit = () => {
    return (
        <>
            <HeaderSix style_2={true} />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="fix">
                        <PaymentArea />
                        <DepositArea />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Deposit;
