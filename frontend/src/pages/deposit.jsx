import React from 'react';
import SEO from '../common/seo';
import DepositMain from '../components/deposit';
import Wrapper from '../layout/wrapper';

const DepositPage = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"Deposit | Lexicrone Finance"} />
            <DepositMain />
        </Wrapper>
    );
};

export default DepositPage;
