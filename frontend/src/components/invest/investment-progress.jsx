import React, { useState, useEffect } from 'react';
import api from '@/src/utils/api';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';

const InvestmentProgress = () => {
    const { setUser } = useAuth();
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    const fetchInvestments = async () => {
        try {
            const { data } = await api.get('/investments');
            setInvestments(data || []);
        } catch (error) {
            console.error("Error fetching investments:", error);
            toast.error("Failed to load investment progress");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    const handleCancel = async (id, amount) => {
        const penalty = amount * 0.1;
        const refund = amount * 0.9;
        
        if (window.confirm(`Are you sure you want to cancel this investment? \n\nImportant: A 10% cancellation penalty ($${penalty.toLocaleString()}) will be deducted. \n\nYou will receive a refund of $${refund.toLocaleString()} (90%) to your dashboard.`)) {
            setCancellingId(id);
            try {
                const { data } = await api.post(`/investments/${id}/cancel`);
                toast.success(data.message);
                if (data.user) setUser(data.user);
                fetchInvestments();
            } catch (error) {
                toast.error(error.response?.data?.message || "Cancellation failed");
            } finally {
                setCancellingId(null);
            }
        }
    };

    const calculateProgress = (start, end) => {
        const startDate = new Date(start).getTime();
        const endDate = new Date(end).getTime();
        const now = new Date().getTime();
        
        if (now >= endDate) return 100;
        if (now <= startDate) return 0;
        
        const total = endDate - startDate;
        const current = now - startDate;
        return Math.min(100, Math.round((current / total) * 100));
    };

    const getDaysRemaining = (end) => {
        const endDate = new Date(end).getTime();
        const now = new Date().getTime();
        const diff = endDate - now;
        if (diff <= 0) return 0;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div style={{ background: '#f4f7fe', minHeight: '100vh', padding: '80px 0' }}>
            <div className="container">
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1b2559', marginBottom: '15px' }}>Investment Progress</h2>
                        <p style={{ color: '#a3aed0', fontSize: '18px', fontWeight: '500' }}>
                            Monitor your investment batches. Profits are shared once the batch matures.
                        </p>
                    </div>

                    <div className="row">
                        {investments.length > 0 ? (
                            investments.map((inv) => {
                                const progress = calculateProgress(inv.start_date, inv.end_date);
                                const daysLeft = getDaysRemaining(inv.end_date);
                                
                                return (
                                    <div key={inv.id} className="col-12 mb-4">
                                        <div style={{ 
                                            background: 'white', 
                                            borderRadius: '24px', 
                                            padding: '30px', 
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                                                <div>
                                                    <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#1b2559', margin: 0 }}>
                                                        {inv.plan?.name || 'Investment Plan'}
                                                    </h4>
                                                    <p style={{ color: '#a3aed0', fontSize: '14px', margin: '5px 0 0 0' }}>
                                                        Status: <span style={{ color: inv.status === 'active' ? '#05cd99' : '#ee5d50', fontWeight: '700', textTransform: 'capitalize' }}>{inv.status}</span>
                                                    </p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#4318ff' }}>
                                                        ${inv.amount.toLocaleString()}
                                                    </span>
                                                    <p style={{ color: '#a3aed0', fontSize: '12px', margin: '2px 0 0 0', fontWeight: '600' }}>INITIAL DEPOSIT</p>
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '30px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                    <span style={{ color: '#1b2559', fontSize: '15px', fontWeight: '700' }}>Maturity Progress</span>
                                                    <span style={{ color: '#4318ff', fontSize: '15px', fontWeight: '800' }}>{progress}%</span>
                                                </div>
                                                <div style={{ width: '100%', height: '14px', background: '#e9edf7', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{ 
                                                        width: `${progress}%`, 
                                                        height: '100%', 
                                                        background: 'linear-gradient(90deg, #4318ff 0%, #5e3aff 100%)', 
                                                        borderRadius: '10px', 
                                                        transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        boxShadow: '0 4px 12px rgba(67, 24, 255, 0.3)'
                                                    }}></div>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                                    <span style={{ color: '#a3aed0', fontSize: '13px', fontWeight: '600' }}>Started: {new Date(inv.start_date).toLocaleDateString()}</span>
                                                    <span style={{ color: '#a3aed0', fontSize: '13px', fontWeight: '600' }}>{daysLeft > 0 ? `${daysLeft} days remaining` : 'Matured'}</span>
                                                </div>
                                            </div>

                                            <div style={{ 
                                                display: 'grid', 
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                                                gap: '20px',
                                                padding: '20px',
                                                background: '#f8f9ff',
                                                borderRadius: '16px'
                                            }}>
                                                <div>
                                                    <p style={{ color: '#a3aed0', fontSize: '12px', fontWeight: '700', margin: '0 0 5px 0' }}>CURRENT PROFIT</p>
                                                    <p style={{ color: '#05cd99', fontSize: '20px', fontWeight: '800', margin: 0 }}>+${inv.profit?.toLocaleString() || '0.00'}</p>
                                                </div>
                                              
                                                <div>
                                                    <p style={{ color: '#a3aed0', fontSize: '12px', fontWeight: '700', margin: '0 0 5px 0' }}>MATURITY DATE</p>
                                                    <p style={{ color: '#1b2559', fontSize: '16px', fontWeight: '700', margin: 0 }}>{new Date(inv.end_date).toLocaleDateString()}</p>
                                                </div>
                                            </div>

                                            {inv.status === 'active' && (
                                                <div style={{ marginTop: '25px', textAlign: 'right' }}>
                                                    <button 
                                                        onClick={() => handleCancel(inv.id, inv.amount)}
                                                        disabled={cancellingId === inv.id}
                                                        style={{ 
                                                            background: 'transparent', 
                                                            color: '#ee5d50', 
                                                            border: '2px solid #ee5d50', 
                                                            borderRadius: '12px', 
                                                            padding: '10px 20px', 
                                                            fontSize: '14px', 
                                                            fontWeight: '700',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.background = '#ee5d50';
                                                            e.target.style.color = 'white';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.background = 'transparent';
                                                            e.target.style.color = '#ee5d50';
                                                        }}
                                                    >
                                                        {cancellingId === inv.id ? 'Cancelling...' : 'Cancel Investment'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-12 text-center" style={{ padding: '60px 0' }}>
                                <div style={{ marginBottom: '25px' }}>
                                    <i className="fas fa-chart-line" style={{ fontSize: '64px', color: '#e2e8f0' }}></i>
                                </div>
                                <h3 style={{ color: '#1b2559', fontWeight: '800', marginBottom: '15px' }}>No Investments Found</h3>
                                <p style={{ color: '#a3aed0', fontSize: '16px', marginBottom: '30px' }}>You don't have any active investment batches at the moment.</p>
                                <Link href="/available-plans" style={{ 
                                    padding: '16px 35px', 
                                    background: '#4318ff', 
                                    color: 'white', 
                                    borderRadius: '16px', 
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    boxShadow: '0 10px 20px rgba(67, 24, 255, 0.2)'
                                }}>
                                    Explore Available Batches
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentProgress;
