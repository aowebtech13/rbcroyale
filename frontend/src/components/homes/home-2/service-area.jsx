import LinearGradientLine from '@/src/svg/linear-gradient-line';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import api from '@/src/utils/api';
import bg_img from "../../../../public/assets/img/service/sv-bg-2-1.jpg" 

const service_content = {
    title: <>Your Investment <br /> Performance Today</>,
    des: <>Real-time metrics of your portfolio and earnings.</>,
}
const {title, des}  = service_content 

const ServiceArea = () => {
    const { isAuthenticated } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchDashboardData();
        }
    }, [isAuthenticated]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('dashboard-data');
            setDashboardData(data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'm';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k';
        }
        return parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const metricsData = isAuthenticated && dashboardData ? [
        {
            id: 1, 
            users_count: <>${formatCurrency(dashboardData.stats.balance)}</>,
            users_status: <>Available Balance</>,
        },
        {
            id: 2, 
            users_count: <>{dashboardData.stats.active_investments_count}<i>+</i></>,
            users_status: <>Active Investments</>,
        },
        {
            id: 3, 
            users_count: <>${formatCurrency(dashboardData.stats.total_profit)}</>,
            users_status: <>Our Payout</>,
        },
    ] : [];

    const investmentMetrics = isAuthenticated && dashboardData ? [
        {
            id: 1,
            icon: 'fa-wallet',
            title: 'Total Invested',
            value: `$${formatCurrency(dashboardData.stats.total_invested)}`,
            description: 'Capital deployed',
            color: 'success'
        },
        {
            id: 2,
            icon: 'fa-chart-line',
            title: 'Active Investments',
            value: dashboardData.stats.active_investments_count,
            description: 'Running investments',
            color: 'primary'
        },
        {
            id: 3,
            icon: 'fa-piggy-bank',
            title: 'Profit Earned',
            value: `$${formatCurrency(dashboardData.stats.total_profit)}`,
            description: 'Total returns',
            color: 'warning'
        },
        {
            id: 4,
            icon: 'fa-coins',
            title: 'Available Balance',
            value: `$${formatCurrency(dashboardData.stats.balance)}`,
            description: 'Ready to invest',
            color: 'info'
        }
    ] : [];

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <div className="tp-service-2__area p-relative pt-70 pb-160">
               <div className="tp-service-2__shape">
                  <Image src={bg_img} alt="theme-pure" />
               </div>
               <div className="container z-index-5">
                  <div className="row align-items-center mb-50">
                     <div className="col-xl-6 col-lg-6">
                        <div className="tp-service-2__section-box">
                           <h3 className="tp-section-title-lg pb-20">{title}</h3>
                           <p>{des}</p>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 wow tpfadeRight" data-wow-duration=".9s" data-wow-delay=".3s">
                        <div className="tp-service-2__user-box p-relative d-flex justify-content-lg-start justify-content-lg-end align-items-center">
                           <div className="tp-service-2__user-shape"> 
                                <LinearGradientLine />
                           </div>
                           {loading ? (
                               <div className="text-center">
                                   <div className="spinner-border spinner-border-sm text-primary" role="status">
                                       <span className="visually-hidden">Loading...</span>
                                   </div>
                               </div>
                           ) : (
                               metricsData.map((item, i)  => 
                                    <div key={i} className="tp-service-2__user">
                                        <span>{item.users_count}</span>
                                        <p>{item.users_status}</p>
                                    </div>
                                )
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="row gx-60">
                    {loading ? (
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        investmentMetrics.map((item, i)  => 
                            <div key={i} className="col-xl-3 col-lg-3 col-md-6 mb-40 wow tpfadeUp" 
                            data-wow-duration=".9s" data-wow-delay=".8s">
                            <div className="tp-service-2__item-wrapper p-relative">
                               <div className="tp-service-2__item d-flex justify-content-between flex-column">
                                  <div className="tp-service-2__icon">
                                     <i className={`fas ${item.icon} fa-2x text-${item.color}`}></i>
                                  </div>
                                  <div className="tp-service-2__text">
                                     <h4 className="tp-service-2__title-sm">{item.title}</h4>
                                     <p className="mb-2 fw-bold" style={{fontSize: '18px'}}>{item.value}</p>
                                     <small className="text-muted">{item.description}</small>
                                  </div>
                               </div>
                               <div className={`tp-service-2__bg-shape tp-service-2__color-${i}`}></div>
                            </div>
                         </div>
                        )
                    )}
                  </div>

                  <div className="row justify-content-center mt-10">
                     <div className="col-lg-6">
                        <div className="text-center">
                           <Link href="/deposit" className="tp-btn-white tp-btn-hover alt-color-black">
                              <span className="white-text">Make Deposit</span>
                              <b></b>
                           </Link>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
        </>
    );
};

export default ServiceArea;