// frontend/src/components/ReferralHub.jsx
import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';

const ReferralHub = () => {

    const [profile, setProfile] = useState(null);
    
      useEffect(() => {
        const fetchProfile = async () => {
          const token = localStorage.getItem('token'); // get JWT from storage
    
          const res = await fetch('https://bitvest-server-dmlk.onrender.com/api/user/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        
    
          const data = await res.json();
          if (res.ok) {
            setProfile(data);
          } else {
            console.error(data.error);
          }
        };
    
        fetchProfile();
      }, []);
    
      if (!profile) return <Loader />;

     const referralLink = `${window.location.origin}/signup?ref=${profile.referralCode}`;
    return (
        <div>
            <h2>{profile.username}'s Referral Hub</h2>
            <p>Referral Code: {profile.referralCode}</p>
            <p>Referral Link: <code>{referralLink}</code></p>
            <p>Referral Balance: ${profile.walletBalance  || 0}</p>
            <p>Total referrals: {profile.referrals ? profile.referrals : '0'}</p>
            <p>Share your referral code with friends to earn rewards!</p>

        </div>
    );
};

export default ReferralHub;
