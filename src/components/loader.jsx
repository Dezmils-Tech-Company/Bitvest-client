import React from 'react';
import './styless/loader.css';
import bitvestor from '../assets/bitvestor.png'; 

const Loader = () => {
  return (
    <>
    <div  className='loader-container'>
      <img src={bitvestor} alt="Logo" className='loader-logo' />
    <div className="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>  
  
processing...   
</div>
</div>
</>
  );
}
export default Loader;