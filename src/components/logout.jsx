import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Logout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'You Are About to Leave Bit~vestor',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/login');
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
      }
    });
  };

  return (
    <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
      {children}
    </span>
  );
};

export default Logout;
