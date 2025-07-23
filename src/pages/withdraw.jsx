import React, { useState } from 'react';
import '../styling/Withdraw.css'; // Import your CSS for styling





export default function Withdraw() {
   const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    const token = localStorage.getItem('token'); // get JWT from storage
    const res = await fetch('https://bitvest-server-dmlk.onrender.com/api/wallet/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h3>Withdraw Funds</h3>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}


