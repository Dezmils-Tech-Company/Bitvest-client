// frontend/src/components/ReferralHub.jsx
import React, { useState, useEffect } from 'react';
import { getReferralCode, getReferralLink, getReferralRewards } from '../services/referralService';

const ReferralHub = () => {
    const [referralCode, setReferralCode] = useState('');
    const [referralLink, setReferralLink] = useState('');
    const [rewardsBalance, setRewardsBalance] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                const referralCodeData = await getReferralCode();
                setReferralCode(referralCodeData.referralCode);

                const referralLinkData = await getReferralLink(referralCodeData.referralCode);
                setReferralLink(referralLinkData.referralLink);

                const rewardsBalanceData = await getReferralRewards();
                setRewardsBalance(rewardsBalanceData.balance);

            } catch (error) {
                console.error("Error fetching referral data:", error);
            }
        };

        if (isLoggedIn) {
            fetchReferralData();
        }

    }, [isLoggedIn]);

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <div>Please log in to access the referral hub.</div>;
    }

    return (
        <div>
            <h2>Referral Hub</h2>
            <p>Referral Code: {referralCode}</p>
            <p>Referral Link: {referralLink}</p>
            <p>Rewards Balance: ${rewardsBalance.toFixed(2)}</p>

        </div>
    );
};

export default ReferralHub;
