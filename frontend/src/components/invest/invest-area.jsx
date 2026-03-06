import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/src/utils/api';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';

const InvestArea = ({ planId }) => {
    const { setUser } = useAuth();
    const router = useRouter();
    const [plan, setPlan] = useState(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [investing, setInvesting] = useState(false);
    const [userBalance, setUserBalance] = useState(0);
    const [availableGroups, setAvailableGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [planRes, userRes, groupsRes] = await Promise.all([
                    api.get('/investment-plans'),
                    api.get('/user'),
                    api.get('/available-groups')
                ]);
                
                const selectedPlan = planRes.data.find(p => p.id === parseInt(planId));
                if (selectedPlan) {
                    setPlan(selectedPlan);
                    setAmount(selectedPlan.min_amount);
                    
                    // Filter groups for this plan
                    const filteredGroups = groupsRes.data.filter(g => g.investment_plan_id === selectedPlan.id);
                    setAvailableGroups(filteredGroups);
                    if (filteredGroups.length > 0) {
                        setSelectedGroupId(filteredGroups[0].id);
                    }
                } else {
                    toast.error("Plan not found");
                    router.push('/price');
                }
                
                setUserBalance(userRes.data.balance);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load investment details");
            } finally {
                setLoading(false);
            }
        };

        if (planId) fetchData();
    }, [planId]);

    const handleInvest = async (e) => {
        e.preventDefault();

        if (!selectedGroupId) {
            toast.error("No available batch for this plan. You cannot invest at this time.");
            return;
        }
        
        if (parseFloat(amount) < plan.min_amount) {
            toast.error(`Minimum investment is $${plan.min_amount}`);
            return;
        }
        
        if (parseFloat(amount) > plan.max_amount) {
            toast.error(`Maximum investment is $${plan.max_amount}`);
            return;
        }

        if (parseFloat(amount) > userBalance) {
            toast.error("Insufficient balance. Please deposit more funds.");
            return;
        }

        setInvesting(true);
        try {
            const { data } = await api.post('/invest', {
                plan_id: plan.id,
                amount: parseFloat(amount),
                group_id: selectedGroupId
            });
            if (data.user) {
                setUser(data.user);
            }
            toast.success("Investment successful!");
            router.push('/investment-progress');
        } catch (error) {
            toast.error(error.response?.data?.message || "Investment failed");
        } finally {
            setInvesting(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (!plan) return null;

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '80px 0' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                                <div style={{ width: '70px', height: '70px', background: '#7c3aed', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '28px' }}>
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '10px' }}>Confirm Investment</h2>
                                <p style={{ color: '#64748b', fontSize: '16px' }}>You are subscribing to the <strong>{plan.name}</strong></p>
                            </div>

                            <div style={{ background: '#f1f5f9', borderRadius: '16px', padding: '20px', marginBottom: '30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ color: '#64748b', fontWeight: '600' }}>Available Balance</span>
                                    <span style={{ color: '#0f172a', fontWeight: '800' }}>${userBalance.toLocaleString()}</span>
                                </div>
                               
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b', fontWeight: '600' }}>Duration</span>
                                    <span style={{ color: '#0f172a', fontWeight: '800' }}>{plan.duration_days} Days</span>
                                </div>
                            </div>

                            <form onSubmit={handleInvest}>
                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Join Investment Batch</label>
                                    {availableGroups.length > 0 ? (
                                        <select 
                                            value={selectedGroupId}
                                            onChange={(e) => setSelectedGroupId(e.target.value)}
                                            style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '16px', fontWeight: '700', color: '#0f172a', outline: 'none', background: 'white' }}
                                            required
                                        >
                                            {availableGroups.map(group => (
                                                <option key={group.id} value={group.id}>
                                                    {group.name} ({group.investments_count}/20 members)
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div style={{ padding: '16px', background: '#fff1f2', border: '1px solid #fda4af', borderRadius: '12px', color: '#e11d48', fontSize: '14px', fontWeight: '600' }}>
                                            <i className="fas fa-exclamation-triangle me-2"></i>
                                            No available batches for this plan currently.
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Investment Amount ($)</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: '700', fontSize: '18px' }}>$</span>
                                        <input 
                                            type="number" 
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            style={{ width: '100%', padding: '16px 20px 16px 45px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '18px', fontWeight: '700', color: '#0f172a', outline: 'none', transition: 'border-color 0.2s' }}
                                            placeholder={`Min: ${plan.min_amount}`}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Min: ${plan.min_amount}</span>
                                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Max: ${plan.max_amount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={investing || availableGroups.length === 0}
                                    style={{ width: '100%', padding: '18px', background: (investing || availableGroups.length === 0) ? '#94a3b8' : '#7c3aed', color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: '800', cursor: (investing || availableGroups.length === 0) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: (investing || availableGroups.length === 0) ? 'none' : '0 10px 25px rgba(124, 58, 237, 0.2)' }}
                                    onMouseEnter={(e) => (!investing && availableGroups.length > 0) && (e.target.style.background = '#6d28d9', e.target.style.transform = 'translateY(-2px)')}
                                    onMouseLeave={(e) => (e.target.style.background = (investing || availableGroups.length === 0) ? '#94a3b8' : '#7c3aed', e.target.style.transform = 'translateY(0)')}
                                >
                                    {investing ? 'Processing...' : (availableGroups.length === 0 ? 'No Batch Available' : 'Confirm & Invest Now')}
                                </button>

                                {parseFloat(amount) > userBalance && (
                                    <div style={{ marginTop: '15px' }}>
                                        <p style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', marginBottom: '10px' }}>Insufficient balance to proceed</p>
                                        <Link href="/deposit" style={{ display: 'block', textAlign: 'center', padding: '12px', background: '#f8fafc', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '12px', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}>
                                            Go to Deposit
                                        </Link>
                                    </div>
                                )}
                            </form>

                            <div style={{ textAlign: 'center', marginTop: '25px' }}>
                                <Link href="/price" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                                    <i className="fas fa-arrow-left me-2"></i> Cancel and go back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestArea;
