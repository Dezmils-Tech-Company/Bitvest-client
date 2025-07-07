import React from 'react';
import Swal from 'sweetalert2';
import { useModal } from '../contexts/ModalContext';
import LoginForm from '../components/LoginForm';

const Logout = ({ children }) => {
const { openModal } = useModal();
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
          openModal(<LoginForm />,{ noOverlay: true, noBg: true });
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
