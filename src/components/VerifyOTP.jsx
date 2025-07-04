// src/components/VerifyOTP.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email; // Get email from signup redirection

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify', {
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
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Verify OTP</h2>
            <p>An OTP has been sent to {email}.  Please enter it below.</p>
            <div>
                <label htmlFor="otp">OTP:</label>
                <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            </div>
            <button type="submit">Verify OTP</button>
        </form>
    );
};

export default VerifyOTP;
