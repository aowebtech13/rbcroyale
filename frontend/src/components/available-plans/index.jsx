import React from 'react';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import AvailablePlansArea from './available-plans-area';


const AvailablePlans = () => {
    return (
        <>
            <HeaderSix style_2={true} />
            <main>
       
                <AvailablePlansArea />
            </main>
            <Footer />
        </>
    );
};

export default AvailablePlans;
