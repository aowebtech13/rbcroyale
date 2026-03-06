import React, { useState, useEffect } from 'react';
import api from '@/src/utils/api';
import { useAuth } from '@/src/context/AuthContext';
import { toast } from 'react-toastify';

const WithdrawArea = () => {
    const { user, setUser } = useAuth();
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [fetchingHistory, setFetchingHistory] = useState(true);

    const methods = [
        { id: 'btc', name: 'Bitcoin (BTC)', placeholder: 'Enter your BTC wallet address' },
        { id: 'eth', name: 'Ethereum (ETH)', placeholder: 'Enter your ETH wallet address' },
        { id: 'usdt', name: 'USDT (TRC20)', placeholder: 'Enter your USDT TRC20 address' },
        { id: 'bank', name: 'Bank Transfer', placeholder: 'Enter Bank Name, Account Number, and Swift Code' },
    ];

    const fetchHistory = async () => {
        try {
            const { data } = await api.get('withdrawals');
            setHistory(data);
        } catch (error) {
            console.error("Error fetching withdrawal history:", error);
        } finally {
            setFetchingHistory(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !method || !details) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (amount > user.balance) {
            toast.error("Insufficient balance.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('withdraw', {
                amount,
                method,
                details
            });
            toast.success(data.message);
            setUser(data.user); // Update local user balance
            setAmount('');
            setDetails('');
            fetchHistory(); // Refresh history
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit withdrawal request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="withdraw-area pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title-wrapper mb-40">
                                <h3 className="section-title">Withdraw Funds</h3>
                                <p>Request a withdrawal from your available balance.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-5 col-lg-6">
                            <div className="tp-withdraw-form-wrapper p-relative z-index-1">
                                <div className="d-flex justify-content-between align-items-center mb-30">
                                    <h4 className="tp-withdraw-form-title mb-0">Request Withdrawal</h4>
                                    <div className="tp-balance-badge p-2 bg-primary text-white rounded">
                                        Balance: ${user?.balance?.toFixed(2) || '0.00'}
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-20">
                                        <label className="form-label">Withdrawal Method</label>
                                        <select 
                                            className="form-select tp-input-style" 
                                            value={method}
                                            onChange={(e) => setMethod(e.target.value)}
                                            required
                                        >
                                            <option value="">Select a method...</option>
                                            {methods.map(m => (
                                                <option key={m.id} value={m.name}>{m.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-20">
                                        <label className="form-label">Amount ($)</label>
                                        <input 
                                            type="number" 
                                            className="form-control tp-input-style" 
                                            placeholder="Min $10.00" 
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            min="10"
                                            required
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label className="form-label">Withdrawal Details</label>
                                        <textarea 
                                            className="form-control tp-input-style py-3" 
                                            rows="3"
                                            placeholder={methods.find(m => m.name === method)?.placeholder || "Enter payment details..."}
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            required
                                            style={{ height: 'auto' }}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="tp-btn w-100" disabled={loading}>
                                        {loading ? 'Processing...' : 'Submit Request'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="col-xl-7 col-lg-6">
                            <div className="tp-withdraw-history-wrapper">
                                <h4 className="tp-withdraw-history-title mb-30">Withdrawal History</h4>
                                <div className="tp-withdraw-table table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Method</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fetchingHistory ? (
                                                <tr><td colSpan="4" className="text-center">Loading history...</td></tr>
                                            ) : history.length > 0 ? (
                                                history.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                        <td>{item.method}</td>
                                                        <td>${parseFloat(item.amount).toFixed(2)}</td>
                                                        <td>
                                                            <span className={`badge ${
                                                                item.status === 'approved' ? 'bg-success' : 
                                                                item.status === 'rejected' ? 'bg-danger' : 
                                                                'bg-warning'
                                                            }`}>
                                                                {item.status}
                                                            </span>
                                                            {item.rejection_reason && (
                                                                <i className="fal fa-info-circle ms-2 text-danger" title={item.rejection_reason}></i>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="4" className="text-center py-4">No withdrawal requests found.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .tp-withdraw-form-wrapper, .tp-withdraw-history-wrapper {
                    background: #fff;
                    border-radius: 12px;
                    padding: 40px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    height: 100%;
                }
                .tp-withdraw-form-title, .tp-withdraw-history-title {
                    font-size: 22px;
                    font-weight: 600;
                    color: #212529;
                }
                .tp-input-style {
                    border: 1px solid #e5e5e5;
                    border-radius: 8px;
                    padding: 0 20px;
                    background: #f9f9f9;
                }
                .tp-input-style:focus {
                    background: #fff;
                    border-color: #007bff;
                    box-shadow: none;
                }
                select.tp-input-style {
                    height: 55px;
                }
                input.tp-input-style {
                    height: 55px;
                }
                .tp-withdraw-table th {
                    border-top: none;
                    color: #6c757d;
                    font-weight: 500;
                    padding: 15px 10px;
                }
                .tp-withdraw-table td {
                    padding: 15px 10px;
                    vertical-align: middle;
                }
                .tp-balance-badge {
                    font-size: 16px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
};

export default WithdrawArea;
