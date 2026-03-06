import React, { useState, useEffect } from 'react';
import api from '@/src/utils/api';
import { toast } from 'react-toastify';
import { usePaystackPayment } from 'react-paystack';
import { useAuth } from '@/src/context/AuthContext';

const DepositArea = () => {
    const { user } = useAuth();
    const [method, setMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [fetching, setFetching] = useState(true);

    const paymentMethods = [
        { 
            id: 0, 
            name: 'Bank Transfer', 
            icon: 'fa-university',
            details: {
                'Account Name': 'Lexicrone Partners Limited',
                'Account Number': '9010847114',
                'Bank Name': 'Moniepoint MFB'
            }
        },
        { 
            id: 1, 
            name: 'Paystack', 
            icon: 'fa-credit-card',
            isPaystack: true
        },
        { 
            id: 2, 
            name: 'Crypto (USDT TRC20)', 
            icon: 'fa-wallet',
            details: {
                'Network': 'TRC20',
                'Asset': 'USDT',
                'Wallet Address': 'TEB9VFXDeVnBzVqCs7kgkN6Q7LQFsmXiH5'
            }
        }
    ];

    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email,
        amount: parseFloat(amount) * 1500 * 100, // Converting USD to NGN (assumed rate 1500) and then to kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = async (reference) => {
        setLoading(true);
        const toastId = toast.loading("Verifying payment, please wait...");
        try {
            const { data } = await api.post('/deposit/paystack/verify', {
                reference: reference.reference,
                amount: amount
            });
            
            toast.update(toastId, { 
                render: "Payment successful! Your balance has been updated.", 
                type: "success", 
                isLoading: false,
                autoClose: 5000 
            });
            
            setAmount('');
            setMethod('');
            fetchHistory();
        } catch (error) {
            console.error("Verification Error:", error);
            const errorMessage = error.response?.data?.message || "Failed to verify payment. Please contact support if your account was debited.";
            toast.update(toastId, { 
                render: errorMessage, 
                type: "error", 
                isLoading: false,
                autoClose: 7000 
            });
        } finally {
            setLoading(false);
        }
    };

    const onClose = () => {
        setLoading(false);
        toast.info("Transaction cancelled", { autoClose: 3000 });
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const { data } = await api.get('/deposits');
            setHistory(data);
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setFetching(false);
        }
    };

    const handleFileChange = (e) => {
        setReceipt(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!method || !amount) {
            toast.error("Please fill all required fields");
            return;
        }

        if (parseFloat(amount) < 50) {
            toast.error("Minimum deposit is $50");
            return;
        }

        if (method === 'Paystack') {
            if (!user?.email) {
                toast.error("User email not found. Please update your profile.");
                return;
            }
            setLoading(true);
            initializePayment(onSuccess, onClose);
            return;
        }

        if (method !== 'Paystack' && !receipt) {
            toast.error(`Please upload a receipt for ${method}`);
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('method', method);
        formData.append('description', description);
        formData.append('receipt', receipt);

        try {
            await api.post('/deposit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Deposit request submitted successfully!");
            setAmount('');
            setMethod('');
            setDescription('');
            setReceipt(null);
            e.target.reset();
            fetchHistory();
        } catch (error) {
            console.error("Deposit Error:", error);
            toast.error(error.response?.data?.message || "Failed to submit deposit request");
        } finally {
            setLoading(false);
        }
    };

    const selectedMethodObj = paymentMethods.find(m => m.name === method);

    return (
        <>
            <div className="deposit-area pt-120 pb-120">
                <div className="container">
                    <div className="row">
                       
                    </div>

                    <div className="row g-4">
                        <div className="col-xl-5 col-lg-6">
                            <div className="tp-deposit-form-wrapper p-relative z-index-1">
                                <h4 className="tp-deposit-form-title mb-30">Make a Deposit</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-25">
                                        <label className="form-label fw-bold">1. Select Payment Method</label>
                                        <div className="row g-3">
                                            {paymentMethods.map(m => (
                                                <div key={m.id} className="col-6">
                                                    <div 
                                                        className={`p-3 border rounded text-center cursor-pointer transition-all ${method === m.name ? 'border-primary bg-primary-light shadow-sm' : 'border-slate-200 hover:border-primary-light'}`}
                                                        onClick={() => setMethod(m.name)}
                                                        style={{ cursor: 'pointer', position: 'relative' }}
                                                    >
                                                        {method === m.name && (
                                                            <div className="position-absolute top-0 end-0 p-1">
                                                                <i className="fas fa-check-circle text-primary" style={{ fontSize: '12px' }}></i>
                                                            </div>
                                                        )}
                                                        <i className={`fas ${m.icon} mb-2 text-primary`} style={{ fontSize: '24px' }}></i>
                                                        <h6 className="mb-0" style={{ fontSize: '13px' }}>{m.name}</h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedMethodObj && selectedMethodObj.details && (
                                        <div className="mb-25 p-3 rounded" style={{ background: '#f1f5f9', border: '1px dashed #cbd5e1' }}>
                                            {Object.entries(selectedMethodObj.details).map(([key, value]) => (
                                                <div key={key} className="mb-2">
                                                    <p className="mb-0 fw-bold text-primary" style={{ fontSize: '12px' }}>{key}:</p>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <code style={{ fontSize: '14px' }}>{value}</code>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-sm p-0 text-primary ms-2"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(value);
                                                                toast.info(`${key} copied`);
                                                            }}
                                                        >
                                                            <i className="fal fa-copy"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mb-25">
                                        <label className="form-label fw-bold">2. Amount ($)</label>
                                        <input 
                                            type="number" 
                                            className="form-control tp-input-style" 
                                            placeholder="Min: $50" 
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                        {method === 'Paystack' && amount && (
                                            <small className="text-primary mt-1 d-block fw-bold">
                                                Estimated: ₦{(parseFloat(amount) * 1500).toLocaleString()}
                                            </small>
                                        )}
                                    </div>

                                    {method !== 'Paystack' && method !== '' && (
                                        <>
                                            <div className="mb-25">
                                                <label className="form-label fw-bold">3. Upload Payment Receipt (RATE : 1500/$)</label>
                                                <input 
                                                    type="file" 
                                                    className="form-control tp-input-style pt-2" 
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                                <small className="text-muted mt-1 d-block">Upload a screenshot of your payment confirmation</small>
                                            </div>

                                            <div className="mb-30">
                                                <label className="form-label fw-bold">4. Additional Note (Optional)</label>
                                                <textarea 
                                                    className="form-control tp-input-style h-auto py-3" 
                                                    rows="3"
                                                    placeholder="Transaction ID or any other details"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </>
                                    )}

                                    <button 
                                        type="submit" 
                                        className="tp-btn w-100 py-3 fw-bold" 
                                        style={{ height: 'auto' }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : (method === 'Paystack' ? 'Pay with Paystack' : 'Confirm & Submit Receipt')}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="col-xl-7 col-lg-6">
                            <div className="tp-deposit-history-wrapper h-100">
                                <h4 className="tp-deposit-history-title mb-30">Deposit Requests</h4>
                                
                                {fetching ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status"></div>
                                    </div>
                                ) : history.length === 0 ? (
                                    <div className="text-center py-5 border rounded" style={{ borderStyle: 'dashed !important' }}>
                                        <p className="text-muted mb-0">No deposit history found</p>
                                    </div>
                                ) : (
                                    <div className="tp-deposit-table table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Ref / Date</th>
                                                    <th>Method</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {history.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <div className="fw-bold" style={{ fontSize: '13px' }}>{item.reference}</div>
                                                            <div className="text-muted" style={{ fontSize: '11px' }}>{new Date(item.created_at).toLocaleDateString()}</div>
                                                        </td>
                                                        <td>{item.method}</td>
                                                        <td className="fw-bold text-dark">${parseFloat(item.amount).toLocaleString()}</td>
                                                        <td>
                                                            <span className={`badge ${
                                                                item.status === 'completed' ? 'bg-success' : 
                                                                item.status === 'failed' ? 'bg-danger' : 
                                                                'bg-warning'
                                                            }`} style={{ textTransform: 'capitalize' }}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .tp-deposit-form-wrapper, .tp-deposit-history-wrapper {
                    background: #fff;
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.04);
                    border: 1px solid #f1f5f9;
                }
                .tp-deposit-form-title, .tp-deposit-history-title {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f172a;
                }
                .tp-input-style {
                    height: 55px;
                    border: 2px solid #f1f5f9;
                    border-radius: 12px;
                    padding: 0 20px;
                    background: #f8fafc;
                    font-weight: 500;
                    color: #1e293b;
                    transition: all 0.2s;
                }
                .tp-input-style:focus {
                    background: #fff;
                    border-color: #7c3aed;
                    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
                }
                .bg-primary-light {
                    background-color: rgba(124, 58, 237, 0.05);
                }
                .border-primary {
                    border-color: #7c3aed !important;
                }
                .text-primary {
                    color: #7c3aed !important;
                }
                .cursor-pointer {
                    cursor: pointer;
                }
                .transition-all {
                    transition: all 0.2s ease-in-out;
                }
                .hover\:border-primary-light:hover {
                    border-color: rgba(124, 58, 237, 0.3) !important;
                }
                .tp-deposit-table th {
                    background: #f8fafc;
                    border-top: none;
                    color: #64748b;
                    font-weight: 700;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    padding: 15px;
                }
                .tp-deposit-table td {
                    padding: 20px 15px;
                    vertical-align: middle;
                    border-bottom: 1px solid #f1f5f9;
                }
            `}</style>
        </>
    );
};

export default DepositArea;
