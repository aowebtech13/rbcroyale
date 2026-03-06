import React from 'react';
import HeaderSix from '@/src/layout/headers/header-6';
import Footer from '@/src/layout/footers/footer';
import DashboardArea from './dashboard-area';
import HeroArea from '../homes/home-2/hero-area';
import ServiceArea from '../homes/home-2/service-area';

const Dashboard = () => {
    return (
        <>
            <HeaderSix style_2={true} />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="fix">
                        <HeroArea />
                        <ServiceArea />
                        <DashboardArea />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
