// src/components/VerifyOTP.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './loader';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false); //for loading state
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email; // Get email from signup redirection

    if (isLoading) {
        return <Loader/>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
         setIsLoading(true); // Optional: set loading state
        
        try {
            const response = await fetch('https://bitvest-server-dmlk.onrender.com/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, otp: otp }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'OTP Verification Failed');
            }

            const responseData = await response.json();
            console.log('OTP Verification Successful:', responseData);

            // Navigate to login or a success page
            navigate('/login');
        } catch (error) {
            console.error('OTP Verification Failed:', error);
            // Handle error, display message to user
        }finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    padding: '2rem 2.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    minWidth: '320px',
                    maxWidth: '90vw',
                    background: '#fafafa'
                }}
            >
                <h2 style={{ marginBottom: '1rem', color: '#010133', textAlign: 'center' }}>Verify OTP</h2>
                <p style={{ marginBottom: '1.5rem', color: '#010133', fontSize: '1rem', textAlign: 'center' }}>
                    An OTP has been sent to <span style={{ fontWeight: 600 }}>{email}</span>. Please enter it below.
                </p>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="otp" style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 500 }}>
                        OTP:
                    </label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{
                            width: '90%',
                            padding: '0.75rem',
                            border: '1px solid #2ae205',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border 0.2s',
                        }}
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength={6}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#2ae205',
                        color: '#fafafa',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    Verify OTP
                </button>
            </form>
        </div>
    );
};

export default VerifyOTP;
