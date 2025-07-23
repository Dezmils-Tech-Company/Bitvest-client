

const API_URL = 'https://bitvest-server-dmlk.onrender.com/api/referral';

const getToken = () => localStorage.getItem('token');

const getReferralCode = async () => {
    const token = getToken(); // Get token directly from localStorage
    try {
        const response = await fetch(`${API_URL}/generate`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting referral code:", error);
        throw error;
    }
};

const getReferralLink = async (referralCode) => {
    try {
        const response = await fetch(`${API_URL}/link/${referralCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting referral link:", error);
        throw error;
    }
};

const getReferralRewards = async () => {
    const token = getToken();
    try {
        const response = await fetch(`${API_URL}/rewards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting referral rewards:", error);
        throw error;
    }
};

export { getReferralCode, getReferralLink, getReferralRewards };
