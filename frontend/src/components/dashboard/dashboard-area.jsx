import React, { useEffect, useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import api from '@/src/utils/api';
import Link from 'next/link';

const TradingViewWidget = () => {
    useEffect(() => {
        const container = document.getElementById('tradingview-widget-container');
        if (!container) return;

        container.innerHTML = '';
        
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.async = true;
        script.type = 'text/javascript';
        script.innerHTML = JSON.stringify({
            "autosize": true,
            "symbol": "FX:EURUSD",
            "timezone": "Etc/UTC",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "details": true,
            "hotlist": true,
            "calendar": true,
            "studies": ["BB@tv-basicstudies", "RSI@tv-basicstudies", "MACD@tv-basicstudies"],
            "height": "700",
            "width": "100%"
        });
        
        container.appendChild(script);

        return () => {
            const existingScripts = container.querySelectorAll('script');
            existingScripts.forEach(script => script.remove());
        };
    }, []);

    return (
        <div id="tradingview-widget-container" className="mb-40" style={{ height: '700px' }}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
};

const DashboardArea = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await api.get('dashboard-data');
                setDashboardData(data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    const transactions = dashboardData?.recent_transactions || [];
    const stats = dashboardData?.stats || { balance: 0, total_profit: 0, total_invested: 0 };

    return (
        <>
            <div className="dashboard-area pt-7 pb-12">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <TradingViewWidget />
                        </div>
                    </div>

                    <div className="row mt-40">
                        <div className="col-xl-8 col-lg-12">
                            <div className="tp-dashboard-widget">
                                <div className="tp-dashboard-widget-header d-flex align-items-center justify-content-between mb-30">
                                    <h4 className="tp-dashboard-widget-title">Recent Transactions</h4>
                                    <Link href="/transactions" className="tp-btn-inner">View All</Link>
                                </div>
                                <div className="tp-dashboard-table table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="font-black text-[10px] uppercase tracking-widest text-slate-400">Activity</th>
                                                <th className="font-black text-[10px] uppercase tracking-widest text-slate-400">Amount</th>
                                                <th className="font-black text-[10px] uppercase tracking-widest text-slate-400">Description</th>
                                                <th className="font-black text-[10px] uppercase tracking-widest text-slate-400">Date</th>
                                                <th className="font-black text-[10px] uppercase tracking-widest text-slate-400">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {transactions.map((tr) => (
                                                <tr key={tr.id} className="hover:bg-slate-50/50 transition-all">
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs
                                                                ${tr.type.includes('deposit') || tr.type.includes('profit') ? 'bg-emerald-50 text-emerald-500' : 
                                                                  tr.type.includes('withdraw') ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
                                                                <i className={`fas ${tr.type.includes('deposit') ? 'fa-arrow-down-to-line' : 
                                                                                 tr.type.includes('withdraw') ? 'fa-arrow-up-from-line' : 
                                                                                 tr.type.includes('profit') ? 'fa-chart-line' : 'fa-exchange-alt'}`}></i>
                                                            </div>
                                                            <span className="font-black text-slate-700 uppercase text-[10px] tracking-wider">{tr.type.replace('_', ' ')}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">
                                                        <span className={`font-black text-sm ${tr.amount > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                            {tr.amount > 0 ? '+' : ''}${Math.abs(tr.amount).toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="py-4">
                                                        <span className="font-bold text-slate-600 text-[11px] truncate max-w-[150px] inline-block" title={tr.description}>
                                                            {tr.description || 'System entry'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 font-bold text-slate-500 text-[11px]">{new Date(tr.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                                                    <td className="py-4 text-right">
                                                        <span className={`badge border-none font-black text-[9px] px-2 py-1 h-auto rounded uppercase tracking-wider
                                                            ${tr.status === 'completed' || tr.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 
                                                              tr.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>
                                                            {tr.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12">
                            <div className="tp-dashboard-widget">
                                <h4 className="tp-dashboard-widget-title mb-30">Quick Actions</h4>
                                <div className="tp-dashboard-actions d-grid gap-3">
                                    <Link href="/available-plans" className="tp-btn w-100 text-center">Join Investment Batch</Link>
                              
                                    <Link href="/withdraw" className="tp-btn-inner w-100 text-center">Withdraw Funds</Link>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .tp-dashboard-widget {
                    background: #fff;
                    border-radius: 12px;
                    padding: 30px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    height: 100%;
                }
                .tp-dashboard-widget-title {
                    font-size: 20px;
                    font-weight: 600;
                }
                .tp-dashboard-table .table {
                    margin-bottom: 0;
                }
                .tp-dashboard-table th {
                    border-top: none;
                    font-weight: 500;
                    color: #6c757d;
                }
            `}</style>
        </>
    );
};

export default DashboardArea;
