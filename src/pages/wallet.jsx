import React, { useEffect, useState } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchWallet = async () => {
      const token = localStorage.getItem('token'); // get JWT from storage
      const res = await fetch('https://bitvest-server-dmlk.onrender.com/api/wallet', {
       method: 'GET',
        headers: {
          'Authorization':`Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setBalance(data.balance);
        setTransactions(data.transactions);
      }
    };

    fetchWallet();
  }, []);

 

  return (

    <div>
      <h2> Wallet Balance: ${balance}</h2>
      <hr/>
      <p> <em> Minimum Withdrwable amount - $3.95 </em> </p>
     
      <h2>Transactions Summary</h2>
      <ul>
  {transactions.map(transaction => (
    <li key={transaction._id}>
      {transaction.type}: ${transaction.amount} - {transaction.description}
    </li>
  ))}
</ul>
    </div>
  );
};

export default Wallet;
