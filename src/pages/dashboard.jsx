import React from 'react';
import { useState, useEffect } from 'react';
import { FiEdit} from 'react-icons/fi';
import '../styling/Dashboard.css';
import InvestmentChart from '../components/investmentChart';
import { useModal } from '../contexts/ModalContext';
import Deposit from '../components/deposit.jsx';
import Loader from '../components/loader';
import '../components/styless/InvestmentChart.css'; 
import { FaAmazonPay, FaBitcoin,FaChartLine,FaCoins,FaDollarSign,FaEnvelope,FaFileSignature,FaGift,FaMoneyBillWave,FaSearch, FaUserPlus, FaUsers, FaWallet } from 'react-icons/fa';
import {MdEco, MdFlashOn, MdInsertChart, MdSwapHoriz} from 'react-icons/md';




export default function Dashboard() {
      const investmentData = [
      { date: '2023-01-01', value: 1000 },
      { date: '2023-02-01', value: 1050 },
      { date: '2023-03-01', value: 1100 },
      { date: '2023-04-01', value: 1080 },
      // ... more data points
    ];
    const [profile, setProfile] = useState(null);
    const {openModal} = useModal();

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

  return (
    <div className="dashboard">
        <div className='profile-container'>
      <div className='profile'>
          
          <div>
          <div className='profile-name'><span>Welcome, </span>
            {profile.username}
          </div>
          <div className='profile-text'>
            <div>
            <FaEnvelope />  {profile.email}
            </div>
          </div>
          </div>
          <button><FiEdit/></button>
      </div>

      <div className='search-form'>
        <form className="search">
          <label htmlFor="search">
            <input className="input" type="text" required="" placeholder="Search @ Bit~Vestor" id="search" />
            <div className="fancy-bg"></div>
            <div className="search">
            <FaSearch className="search-icon" />
           </div>
        
       </label>
      </form>
          
      </div>
      </div>
      
      <hr />

      {/* Grid  cards showing stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaMoneyBillWave className="icon" />
          <div className="stat-title">Wallet Balance</div>
          <div className="stat-value">${profile.walletBalance || 0}</div>
        </div>
        <div className="stat-card">
          <FaAmazonPay className="icon" />
          <div className="stat-title">Total Cashout</div>
          <div className="stat-value">${profile.totalCashout || 0}</div>
        </div>
        <div className="stat-card">
          <FaBitcoin className="icon" />
          <div className="stat-title">Daily Income</div>
          <div className="stat-value">${profile.dailyIncome || 0}</div>
        </div>
        <div className="stat-card">
          <FaUserPlus className="icon" />
          <div className="stat-title">Total Referrals</div>
          <div className="stat-value">{profile.referrals || 0}</div>
        </div>
        <div className="stat-card">
          <FaDollarSign className="icon" />
          <div className="stat-title">Investment Profit</div>
          <div className="stat-value">15%</div>
        </div>
        
      </div>
      <hr />


    <h3> <MdFlashOn/> Quick Actions</h3>
        <div className="Quick-actions">     
        <div onClick={()=>openModal(<Deposit />)}className="action-card">
          <FaCoins className="icon" />
          <div className="stat-title">Deposit</div>
        </div>
        <div className="action-card">
          <FaWallet className="icon" />
          <div className="stat-title">Withdraw</div>
        </div>
        <div className="action-card">
          <FaChartLine className="icon" />
          <div className="stat-title">Invest</div> 
        </div>
         <div className="action-card">
          <FaGift className="icon" />
          <div className="stat-title">Redeem</div>
        </div>
        <div className="action-card">
          <FaUserPlus className="icon" />
          <div className="stat-title">Invite</div>    
        </div>
        <div className="action-card">
          <FaFileSignature className="icon" />
          <div className="stat-title">Waiver</div>
        </div> 
      </div>

  <hr />

    <h3> <MdInsertChart/> Investment Tracker</h3>
        <div className="Quick-actions"> 
          <div className="chart-container">
             <InvestmentChart data={investmentData} />
           </div>    
      </div>

      <hr />

    <h3> <MdEco/> Impact Overview</h3>
        <div className="Quick-actions">     
        <div className="impact-overview">
          <div className="info-row">
            <FaUsers className="icon" />
            <div>
              <div className="impact-title">Total Members</div>
              <div className="impact-value">289</div>
            </div>
          </div>
        </div>

        <div className="impact-overview">
          <div className="info-row">
            <FaUsers className="icon" />
            <div>
              <div className="impact-title">Active Members</div>
              <div className="impact-value">181</div>
            </div>
          </div>
        </div>

          <div className="impact-overview">
          <div className="info-row">
            <FaUsers className="icon" />
            <div>
              <div className="impact-title">Target Members</div>
              <div className="impact-value">10,000</div>
            </div>
          </div>
        </div>

        <div className="impact-overview">
          <div className="info-row">
            <FaUsers className="icon" />
            <div>
              <div className="impact-title">Years In services</div>
              <div className="impact-value">6 Months</div>
            </div>
          </div>
        </div>
        
         
      </div>

        <hr />

    <h3> <MdSwapHoriz/> Transactions</h3>
        <div className="Quick-actions">     
       <p>Your Transactions will appear here</p>

        
          
         
      </div>

        <hr />

    </div>
  );
}
