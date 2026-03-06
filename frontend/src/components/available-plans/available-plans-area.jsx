import React, { useState, useEffect } from 'react';
import api from '@/src/utils/api';
import { toast } from 'react-toastify';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from "../../../public/assets/img/logo/logo-white.png";

const AvailablePlansArea = () => {
    const { setUser } = useAuth();
    const router = useRouter();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userBalance, setUserBalance] = useState(0);
    const [investingGroupId, setInvestingGroupId] = useState(null);
    const [amounts, setAmounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [groupsRes, userRes] = await Promise.all([
                    api.get('/available-groups'),
                    api.get('/user')
                ]);
                setGroups(groupsRes.data);
                setUserBalance(userRes.data.balance);
                
                const initialAmounts = {};
                groupsRes.data.forEach(group => {
                    if (group.plan) {
                        initialAmounts[group.id] = group.plan.min_amount;
                    }
                });
                setAmounts(initialAmounts);
            } catch (error) {
                console.error("Error fetching available groups:", error);
                toast.error("Failed to load available plans");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAmountChange = (groupId, value) => {
        setAmounts(prev => ({ ...prev, [groupId]: value }));
    };

    const calculateDaysLeft = (createdAt) => {
        const createdDate = new Date(createdAt);
        const expiryDate = new Date(createdDate.getTime() + (5 * 24 * 60 * 60 * 1000));
        const now = new Date();
        const diffTime = expiryDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const handleInvest = async (group) => {
        const amount = parseFloat(amounts[group.id]);
        
        if (isNaN(amount) || amount < group.plan?.min_amount) {
            toast.error(`Minimum investment for this plan is $${group.plan?.min_amount}`);
            return;
        }
        
        if (amount > group.plan?.max_amount) {
            toast.error(`Maximum investment for this plan is $${group.plan?.max_amount?.toLocaleString()}`);
            return;
        }

        if (amount > userBalance) {
            toast.error("Insufficient balance. Please deposit more funds.");
            return;
        }

        setInvestingGroupId(group.id);
        try {
            const { data } = await api.post('/invest', {
                plan_id: group.plan?.id,
                group_id: group.id,
                amount: amount
            });
            if (data.user) {
                setUser(data.user);
                setUserBalance(data.user.balance);
            }
            toast.success(`Successfully joined ${group.name}!`);
            router.push('/investment-progress');
        } catch (error) {
            toast.error(error.response?.data?.message || "Investment failed");
        } finally {
            setInvestingGroupId(null);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="pt-120 pb-120 overflow-hidden p-relative" style={{ background: '#f8fafc' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10">
                        <div className="tp-section-title-wrapper text-center mb-60">
                            <span className="tp-section-subtitle-3 mb-15">LIVE OPPORTUNITIES</span>
                            <h3 className="tp-section-title mb-15">Active Investment Batches</h3>
                            <p className="batch-subtitle mx-auto" style={{ maxWidth: '600px' }}>Join high-performance group batches and maximize your returns through collective liquidity pools.</p>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {groups.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <div className="empty-state-icon mb-25">
                                <i className="fas fa-layer-group fa-4x text-light-gray"></i>
                            </div>
                            <h4 className="font-black text-muted-gray">NO BATCHES CURRENTLY OPEN</h4>
                            <p className="text-muted-gray">New batches are generated automatically when existing ones fill up or expire.</p>
                        </div>
                    ) : (
                        groups.map((group) => {
                            const daysLeft = calculateDaysLeft(group.created_at);
                            const memberPercent = (group.investments_count / 20) * 100;
                            
                            return (
                                <div key={group.id} className="col-xl-4 col-md-6">
                                    <div className="batch-card-sleek h-100 transition-all">
                                        <div className="card-top-info d-flex justify-content-between align-items-center mb-25">
                                            <div className="batch-id-badge">
                                                ID: #{group.id.toString().padStart(4, '0')}
                                            </div>
                                            <div className={`days-badge-sleek ${daysLeft < 2 ? 'urgent' : ''}`}>
                                                <i className="far fa-clock me-1"></i> {daysLeft}D Left
                                            </div>
                                        </div>

                                        <div className="batch-header mb-30">
                                            <div className="d-flex align-items-center gap-3 mb-10">
                                                <div className="icon-box-sleek">
                                                    <Image src={logo} alt="Logo" width={24} height={24} />
                                                </div>
                                                <h4 className="batch-title-sleek mb-0">{group.name}</h4>
                                            </div>
                                            <div className="strategy-tag">
                                                <span className="pulse-dot"></span>
                                                {group.plan?.name || 'Standard'} partnership
                                            </div>
                                        </div>

                                        <div className="capacity-section mb-30">
                                            <div className="d-flex justify-content-between align-items-center mb-10">
                                                <span className="label-sleek">Pool Capacity</span>
                                                <span className="value-sleek">{group.investments_count} / 20 Participants</span>
                                            </div>
                                            <div className="progress-sleek">
                                                <div 
                                                    className="progress-bar-sleek" 
                                                    style={{ width: `${memberPercent}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                       

                                        <div className="investment-form-sleek">
                                            <div className="input-group-sleek mb-20">
                                                <div className="d-flex justify-content-between mb-8">
                                                    <label className="label-sleek">Subscription Amount</label>
                                                    <span className="range-sleek">${group.plan?.min_amount} - ${group.plan?.max_amount}</span>
                                                </div>
                                                <div className="position-relative">
                                                    <span className="currency-sleek">$</span>
                                                    <input 
                                                        type="number" 
                                                        className="input-sleek"
                                                        value={amounts[group.id] || ''}
                                                        onChange={(e) => handleAmountChange(group.id, e.target.value)}
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>

                                            <button 
                                                className="btn-sleek w-100"
                                                onClick={() => handleInvest(group)}
                                                disabled={investingGroupId === group.id}
                                            >
                                                {investingGroupId === group.id ? (
                                                    <><span className="spinner-border spinner-border-sm me-2"></span> Subscribing...</>
                                                ) : (
                                                    <><i className="fas fa-bolt me-2"></i> Join Batch</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .batch-card-sleek {
                    background: #ffffff;
                    border: 1px solid #edf2f7;
                    border-radius: 24px;
                    padding: 32px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                    position: relative;
                }
                .batch-card-sleek:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    border-color: #e2e8f0;
                }
                .batch-id-badge {
                    font-size: 11px;
                    font-weight: 700;
                    color: #64748b;
                    background: #f1f5f9;
                    padding: 4px 10px;
                    border-radius: 8px;
                    letter-spacing: 0.5px;
                }
                .days-badge-sleek {
                    font-size: 11px;
                    font-weight: 700;
                    color: #059669;
                    background: #ecfdf5;
                    padding: 4px 10px;
                    border-radius: 8px;
                }
                .days-badge-sleek.urgent {
                    color: #dc2626;
                    background: #fef2f2;
                }
                .icon-box-sleek {
                    width: 42px;
                    height: 42px;
                    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
                    padding: 8px;
                }
                .batch-title-sleek {
                    font-size: 22px;
                    font-weight: 800;
                    color: #1e293b;
                    letter-spacing: -0.5px;
                }
                .strategy-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                    padding-left: 54px;
                }
                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    background: #7c3aed;
                    border-radius: 50%;
                    box-shadow: 0 0 0 rgba(124, 58, 237, 0.4);
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
                }
                .label-sleek {
                    font-size: 12px;
                    font-weight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .value-sleek {
                    font-size: 13px;
                    font-weight: 700;
                    color: #475569;
                }
                .progress-sleek {
                    height: 8px;
                    background: #f1f5f9;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .progress-bar-sleek {
                    height: 100%;
                    background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%);
                    border-radius: 10px;
                    transition: width 1s ease-in-out;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    background: #f8fafc;
                    padding: 16px;
                    border-radius: 16px;
                }
                .stat-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .stat-label {
                    font-size: 10px;
                    font-weight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                }
                .stat-value {
                    font-size: 18px;
                    font-weight: 800;
                    color: #1e293b;
                }
                .stat-value.highlight {
                    color: #7c3aed;
                }
                .input-sleek {
                    width: 100%;
                    height: 54px;
                    background: #ffffff;
                    border: 2px solid #f1f5f9;
                    border-radius: 14px;
                    padding: 0 20px 0 42px;
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                    transition: all 0.2s;
                }
                .input-sleek:focus {
                    border-color: #7c3aed;
                    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
                    outline: none;
                }
                .currency-sleek {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-weight: 800;
                    color: #94a3b8;
                    font-size: 18px;
                }
                .range-sleek {
                    font-size: 11px;
                    font-weight: 700;
                    color: #94a3b8;
                }
                .btn-sleek {
                    height: 54px;
                    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
                    color: white;
                    border: none;
                    border-radius: 14px;
                    font-size: 16px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.25);
                }
                .btn-sleek:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(124, 58, 237, 0.35);
                    filter: brightness(1.1);
                }
                .btn-sleek:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }
                .tp-section-subtitle-3 {
                    font-size: 14px;
                    font-weight: 800;
                    color: #7c3aed;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    display: block;
                }
                .batch-subtitle {
                    font-size: 16px;
                    color: #64748b;
                    line-height: 1.6;
                }
            `}</style>
        </div>
    );
};

export default AvailablePlansArea;
