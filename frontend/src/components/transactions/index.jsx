import React from 'react';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import TransactionsArea from './transactions-area';
import Breadcrumb from '../../common/breadcrumbs/breadcrumb';

const Transactions = () => {
    return (
        <>
            <HeaderSix style_2={true} />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="fix">
                        <Breadcrumb title_top="Transaction" title_bottom="History" />
                        <TransactionsArea />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Transactions;
