import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaShareSquare , FaProductHunt, FaMoneyBill, FaUser, FaArrowAltCircleRight} from 'react-icons/fa';
import { MdTipsAndUpdates } from 'react-icons/md';
import '../styling/Sidebar.css';
import { RiBankCardLine } from 'react-icons/ri';
import Logout from './logout'; // Import the Logout component


export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
    
       <button className="close-button" onClick={toggleSidebar}>
        &times; {/* Close Icon */}
      </button>
      <br /> <br />
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} end>
        <FaHome /> Dashboard
      </NavLink>
      <NavLink to="/Products" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaProductHunt /> Products
      </NavLink>
      <NavLink to="/ Wallet" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaMoneyBill /> Wallet
      </NavLink>
      <NavLink to="/withdraw" className={({ isActive }) => isActive ? 'active' : ''}>
        <RiBankCardLine /> Withdraw
      </NavLink>
      <NavLink to="/Refferal" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaShareSquare /> Refferal Hub
      </NavLink>
      <NavLink to="/updates" className={({ isActive }) => isActive ? 'active' : ''}>
        <MdTipsAndUpdates /> Updates
      </NavLink>

      <div className="sidebar-footer">
        <NavLink to="/PROFILE" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaUser/> PROFILE
        </NavLink>

        <Logout>
          <button className="logout-button"><FaArrowAltCircleRight /> Logout</button>
        </Logout>
        
      </div>
    </nav>
  );
}
