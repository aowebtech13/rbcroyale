import React, { useEffect, useState } from 'react';
import api from '@/src/utils/api';

const TransactionsArea = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0
    });

    const fetchTransactions = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await api.get(`transactions?page=${page}`);
            setTransactions(data.data);
            setPagination({
                current_page: data.current_page,
                last_page: data.last_page,
                total: data.total
            });
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.last_page) {
            fetchTransactions(page);
        }
    };

    const getStats = () => {
        const inflows = transactions
            .filter(t => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);
        const outflows = transactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return {
            inflows,
            outflows,
            netFlow: inflows - outflows
        };
    };

    const stats = getStats();

    if (loading && transactions.length === 0) return (
        <div className="container pt-120 pb-120">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading transactions...</p>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '120px' }}>
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: '40px', paddingTop: '40px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>Financial Ledger</h2>
                    <p style={{ color: '#64748b', fontSize: '16px', fontWeight: '500' }}>Complete transaction history and account activity</p>
                </div>

                {/* Stats Cards */}
                <div className="row mb-40">
                    {/* Inflows Card */}
                    <div className="col-lg-4 col-md-6 mb-30">
                        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #d1d5db', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div>
                                        <p style={{ color: '#64748b', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>Total Inflows</p>
                                        <p style={{ fontSize: '28px', fontWeight: '900', color: '#059669' }}>${stats.inflows.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                                    </div>
                                    <div style={{ width: '48px', height: '48px', background: '#d1fae5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fas fa-arrow-down-to-line" style={{ color: '#10b981', fontSize: '18px' }}></i>
                                    </div>
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deposits & Income</div>
                            </div>
                        </div>
                    </div>

                    {/* Outflows Card */}
                    <div className="col-lg-4 col-md-6 mb-30">
                        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #d1d5db', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div>
                                        <p style={{ color: '#64748b', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>Total Outflows</p>
                                        <p style={{ fontSize: '28px', fontWeight: '900', color: '#dc2626' }}>${stats.outflows.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                                    </div>
                                    <div style={{ width: '48px', height: '48px', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fas fa-arrow-up-from-line" style={{ color: '#ef4444', fontSize: '18px' }}></i>
                                    </div>
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Withdrawals & Expenses</div>
                            </div>
                        </div>
                    </div>

                    {/* Net Flow Card */}
                    <div className="col-lg-4 col-md-6 mb-30">
                        <div style={{ background: 'white', borderRadius: '16px', border: `1px solid ${stats.netFlow >= 0 ? '#d1d5db' : '#d1d5db'}`, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div>
                                        <p style={{ color: '#64748b', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>Net Flow</p>
                                        <p style={{ fontSize: '28px', fontWeight: '900', color: stats.netFlow >= 0 ? '#2563eb' : '#ea580c' }}>
                                            ${stats.netFlow.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div style={{ width: '48px', height: '48px', background: stats.netFlow >= 0 ? '#dbeafe' : '#ffedd5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className={`fas ${stats.netFlow >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`} style={{ color: stats.netFlow >= 0 ? '#3b82f6' : '#f97316', fontSize: '18px' }}></i>
                                    </div>
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: stats.netFlow >= 0 ? '#2563eb' : '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {stats.netFlow >= 0 ? 'Positive Balance' : 'Net Outflow'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #d1d5db', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', padding: '24px', marginBottom: '24px' }}>
                    <div className="row g-3">
                        <div className="col-lg-8">
                            <div style={{ position: 'relative' }}>
                                <i className="fas fa-search" style={{ position: 'absolute', left: '16px', top: '12px', color: '#94a3b8', fontSize: '14px' }}></i>
                                <input
                                    type="text"
                                    placeholder="Search by description or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: '100%', paddingLeft: '40px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                style={{ width: '100%', padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#475569', boxSizing: 'border-box', background: 'white' }}
                            >
                                <option value="all">All Types</option>
                                <option value="deposit">Deposits</option>
                                <option value="withdraw">Withdrawals</option>
                                <option value="profit">Profits</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #d1d5db', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid #d1d5db', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '0' }}>Recent Transactions</h3>
                        <div style={{ background: '#dbeafe', padding: '8px 16px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                            <span style={{ fontSize: '12px', fontWeight: '900', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{pagination.total} Records</span>
                        </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ fontWeight: '900', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', padding: '20px 24px', textAlign: 'left' }}>Transaction</th>
                                    <th style={{ fontWeight: '900', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', padding: '20px 24px', textAlign: 'center' }}>Amount</th>
                                    <th style={{ fontWeight: '900', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', padding: '20px 24px', textAlign: 'left' }}>Description</th>
                                    <th style={{ fontWeight: '900', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', padding: '20px 24px', textAlign: 'left' }}>Date & Time</th>
                                    <th style={{ fontWeight: '900', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', padding: '20px 24px', textAlign: 'center' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((tr) => {
                                        const bgColor = tr.type.includes('deposit') ? '#d1fae5' : tr.type.includes('profit') ? '#dbeafe' : tr.type.includes('withdraw') ? '#fee2e2' : '#f1f5f9';
                                        const textColor = tr.type.includes('deposit') ? '#059669' : tr.type.includes('profit') ? '#2563eb' : tr.type.includes('withdraw') ? '#dc2626' : '#64748b';
                                        
                                        const statusBgColor = tr.status === 'completed' || tr.status === 'approved' ? '#d1fae5' : tr.status === 'pending' ? '#fef3c7' : '#fee2e2';
                                        const statusTextColor = tr.status === 'completed' || tr.status === 'approved' ? '#047857' : tr.status === 'pending' ? '#92400e' : '#991b1b';
                                        const statusDotColor = tr.status === 'completed' || tr.status === 'approved' ? '#10b981' : tr.status === 'pending' ? '#f59e0b' : '#ef4444';
                                        
                                        return (
                                            <tr key={tr.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: '20px 24px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{ width: '44px', height: '44px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', background: bgColor, color: textColor, transition: 'transform 0.2s' }}>
                                                            <i className={`fas ${tr.type.includes('deposit') ? 'fa-arrow-down-to-line' : tr.type.includes('profit') ? 'fa-chart-line' : tr.type.includes('withdraw') ? 'fa-arrow-up-from-line' : 'fa-exchange-alt'}`}></i>
                                                        </div>
                                                        <div>
                                                            <p style={{ fontWeight: '900', color: '#0f172a', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>
                                                                {tr.type.replace('_', ' ')}
                                                            </p>
                                                            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0' }}>
                                                                ID: {tr.id.toString().padStart(6, '0')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                                                    <span style={{ fontWeight: '900', fontSize: '16px', letterSpacing: '0.05em', color: tr.amount > 0 ? '#059669' : '#dc2626' }}>
                                                        <span style={{ color: tr.amount > 0 ? '#10b981' : '#ef4444' }}>
                                                            {tr.amount > 0 ? '+' : '-'}
                                                        </span>
                                                        ${Math.abs(tr.amount).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '20px 24px', maxWidth: '300px' }}>
                                                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#475569', margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={tr.description}>
                                                        {tr.description || 'System entry'}
                                                    </p>
                                                </td>
                                                <td style={{ padding: '20px 24px' }}>
                                                    <div>
                                                        <p style={{ fontWeight: '900', color: '#0f172a', fontSize: '14px', margin: '0 0 4px 0' }}>
                                                            {new Date(tr.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </p>
                                                        <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0' }}>
                                                            {new Date(tr.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', fontWeight: '900', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${statusBgColor}`, background: statusBgColor, color: statusTextColor }}>
                                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusDotColor }}></span>
                                                        {tr.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '64px 24px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                                <div style={{ width: '64px', height: '64px', background: '#e2e8f0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                                                    <i className="fas fa-inbox" style={{ fontSize: '24px' }}></i>
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px', margin: '0 0 4px 0' }}>No Transactions Yet</p>
                                                    <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0' }}>Your transaction history will appear here</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {pagination.last_page > 1 && (
                        <div style={{ background: '#f8fafc', padding: '24px', display: 'flex', justifyContent: 'center', borderTop: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button 
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '900',
                                        transition: 'all 0.2s',
                                        border: pagination.current_page === 1 ? '1px solid #e2e8f0' : '1px solid #cbd5e1',
                                        background: pagination.current_page === 1 ? '#f1f5f9' : 'white',
                                        color: pagination.current_page === 1 ? '#cbd5e1' : '#475569',
                                        cursor: pagination.current_page === 1 ? 'not-allowed' : 'pointer'
                                    }}
                                    onClick={() => handlePageChange(pagination.current_page - 1)}
                                    disabled={pagination.current_page === 1}
                                >
                                    <i className="fas fa-chevron-left" style={{ fontSize: '12px' }}></i>
                                </button>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[...Array(Math.min(pagination.last_page, 5)).keys()].map((p) => {
                                        let pageNum = p + 1;
                                        if (pagination.current_page > 3 && pagination.last_page > 5) {
                                            pageNum = pagination.current_page - 2 + p;
                                        }
                                        return (
                                            <button 
                                                key={pageNum} 
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '8px',
                                                    fontWeight: '900',
                                                    transition: 'all 0.2s',
                                                    border: pagination.current_page === pageNum ? 'none' : '1px solid #cbd5e1',
                                                    background: pagination.current_page === pageNum ? '#2563eb' : 'white',
                                                    color: pagination.current_page === pageNum ? 'white' : '#475569',
                                                    boxShadow: pagination.current_page === pageNum ? '0 10px 15px -3px rgba(37, 99, 235, 0.2)' : 'none',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => handlePageChange(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button 
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '900',
                                        transition: 'all 0.2s',
                                        border: pagination.current_page === pagination.last_page ? '1px solid #e2e8f0' : '1px solid #cbd5e1',
                                        background: pagination.current_page === pagination.last_page ? '#f1f5f9' : 'white',
                                        color: pagination.current_page === pagination.last_page ? '#cbd5e1' : '#475569',
                                        cursor: pagination.current_page === pagination.last_page ? 'not-allowed' : 'pointer'
                                    }}
                                    onClick={() => handlePageChange(pagination.current_page + 1)}
                                    disabled={pagination.current_page === pagination.last_page}
                                >
                                    <i className="fas fa-chevron-right" style={{ fontSize: '12px' }}></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionsArea;
