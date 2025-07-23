import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard';
import Updates from './pages/Updates.jsx';
import Products from './pages/products.jsx';
import Loader from './components/loader.jsx';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ReferralHub from './components/ReferralHub';
import VerifyOTP from './components/VerifyOTP';
import Withdraw from './pages/withdraw.jsx';
import Wallet from './pages/wallet.jsx';
import {  Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { ModalProvider} from './contexts/ModalContext'; // Import ModalProvider and useModal
import Modal from './components/Modal'; // Import the Modal component

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboard', { replace: true }); // Redirect *immediately* after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login', { replace: true }); // Redirect *immediately* after logout
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    const checkAuth = async () => {
      setLoading(true); // Start loading here.
      if (token) {
        try {
          const response = await fetch('https://bitvest-server-dmlk.onrender.com/api/auth/validate-token',{
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (response.ok) {
            setIsLoggedIn(true);
            if (window.location.pathname === '/login' || window.location.pathname === '/') { //Avoid infinite redirect loops
              navigate('/dashboard', { replace: true });
            }
          } else {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/login', { replace: true });
          }
        } catch (error) {
          console.error("Error validating token:", error);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          navigate('/login', { replace: true });
        }
      } else {
         if (window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/verify-otp') {
          navigate('/login', { replace: true });
        }
      }
      setLoading(false); // Stop loading here.
    };

    checkAuth();

  }, [navigate]);

  if (loading) return <Loader />;

  return (
    
      <ModalProvider> {/* Wrap the entire application with ModalProvider */}
        <div className="app-container">
          {isLoggedIn ? (
            <>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div className="main-area">
                <Header toggleSidebar={toggleSidebar} onLogout={handleLogout} />
                <div className="content-area">
                  
                    
                      <div className="page-content">
                        <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/updates" element={<Updates />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/Refferal" element={<ReferralHub />} />
                        <Route path="/wallet" element={<Wallet />} />
                         <Route path="/withdraw" element={<Withdraw />} />
                      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    </Routes>
                      </div>
                      
                 
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate replace to="/login" />} />  {/* Catch-all redirect */}
            </Routes>
          )}
          <Modal /> {/* Render the Modal component */}
        </div>
      </ModalProvider>
    
  );
}

export default App;
