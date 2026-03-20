import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import api from '@/src/utils/api';
import { toast } from 'react-toastify';

const ForgotPasswordArea = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('forgot-password-otp', { email });
            toast.success("OTP sent to your email!");
            setStep(2);
            setTimer(300);
        } catch (error) {
            const errorMessage = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat()[0] 
                : (error.response?.data?.message || "Failed to send OTP");
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('verify-otp', { email, otp });
            toast.success("OTP verified!");
            setStep(3);
        } catch (error) {
            const errorMessage = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat()[0] 
                : (error.response?.data?.message || "Invalid OTP");
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await api.post('reset-password-with-otp', { 
                email, 
                otp, 
                password: newPassword,
                password_confirmation: confirmPassword 
            });
            toast.success("Password reset successfully!");
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            const errorMessage = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat()[0] 
                : (error.response?.data?.message || "Failed to reset password");
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                padding: '40px',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <i className="fas fa-lock" style={{ fontSize: '32px', color: '#7c3aed' }}></i>
                    </div>
                    <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', color: '#1a202c', margin: '0 0 8px 0' }}>
                        Reset Password
                    </h2>
                    <p style={{ textAlign: 'center', color: '#718096', fontSize: '14px', margin: '0' }}>
                        {step === 1 && 'Enter your email to receive an OTP'}
                        {step === 2 && 'Enter the 7-digit code sent to your email'}
                        {step === 3 && 'Create your new password'}
                    </p>
                </div>

                <form onSubmit={step === 1 ? handleSendOTP : step === 2 ? handleVerifyOTP : handleResetPassword}>
                    {step === 1 && (
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '14px',
                                    transition: 'all 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>
                                Enter OTP Code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 7))}
                                placeholder="0000000"
                                maxLength="7"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '18px',
                                    letterSpacing: '4px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    transition: 'all 0.3s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '13px', color: '#718096' }}>
                                {timer > 0 ? (
                                    <span>Code expires in <strong style={{ color: '#e53e3e' }}>{formatTime(timer)}</strong></span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#667eea',
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            padding: '0'
                                        }}
                                    >
                                        Resend Code
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password (min 8 characters)"
                                    required
                                    minLength={8}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '14px',
                                        transition: 'all 0.3s',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '14px',
                                        transition: 'all 0.3s',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: '#1E4A91',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.3s',
                            marginBottom: '16px'
                        }}
                        onMouseEnter={(e) => !loading && (e.target.style.background = '#71ca38', e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 10px 25px rgba(113, 202, 56, 0.2)')}
                        onMouseLeave={(e) => (e.target.style.background = '#1E4A91', e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = 'none')}
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                                {step === 1 ? 'Sending...' : step === 2 ? 'Verifying...' : 'Resetting...'}
                            </>
                        ) : (
                            step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Reset Password'
                        )}
                    </button>

                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => {
                                setStep(step - 1);
                                if (step === 2) setOtp('');
                                if (step === 3) setNewPassword('');
                                setConfirmPassword('');
                            }}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                background: 'transparent',
                                color: '#1E4A91',
                                border: '2px solid #1E4A91',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => (e.target.style.background = '#71ca38', e.target.style.color = 'white', e.target.style.borderColor = '#71ca38')}
                            onMouseLeave={(e) => (e.target.style.background = 'transparent', e.target.style.color = '#1E4A91', e.target.style.borderColor = '#1E4A91')}
                        >
                            Back
                        </button>
                    )}
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#718096' }}>
                        Remember your password?
                    </p>
                    <Link href="/sign-in" style={{
                        color: '#1E4A91',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        transition: 'color 0.3s'
                    }} onMouseEnter={(e) => e.target.style.color = '#71ca38'} onMouseLeave={(e) => e.target.style.color = '#1E4A91'}>
                        Sign In Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordArea;
