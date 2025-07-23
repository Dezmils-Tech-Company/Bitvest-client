 import React, { useState } from 'react';

const AddFunds = () => {
  const [amount, setAmount] = useState('');
  const handleAddFunds = async () => {
     const token = localStorage.getItem('token'); // get JWT from storage
    const res = await fetch('https://bitvest-server-dmlk.onrender.com/api/wallet/add', {
      method: 'POST',
      headers: {
     'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount: Number(amount) })
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);
      setAmount('');
    }
  };

  return (
    <div>
      <h3>Add Funds</h3>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleAddFunds}>Add</button>
    </div>
    
  );
};

export default AddFunds;