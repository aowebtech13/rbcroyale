import React from 'react';
import SEO from '../common/seo';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import InvestmentProgress from '../components/invest/investment-progress';
import Wrapper from '../layout/wrapper';
import ProtectedRoute from '../common/ProtectedRoute';

const InvestmentProgressPage = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <SEO pageTitle={"Investment Progress | Lexicrone Finance"} />
                <HeaderSix style_2={true} />
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <main className="fix">
                            <InvestmentProgress />
                        </main>
                        <Footer />
                    </div>
                </div>
            </Wrapper>
        </ProtectedRoute>
    );
};

export default InvestmentProgressPage;
