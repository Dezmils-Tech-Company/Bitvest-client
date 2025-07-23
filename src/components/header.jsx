import React from 'react';
import {FaHome, FaBell, FaSearch} from  'react-icons/fa';
import '../App.css';
import { MdMenu } from 'react-icons/md';
import bitvestor from '../assets/bitvestor.png';


export default function Header({ toggleSidebar }) {
    
 
  return (
    <>
    <div className='headbar'>
      <header>
        <div className='heads'>
        <div className='headleft'>
         <button className='home' ><FaHome/></button>
         <button className='menu' onClick={toggleSidebar} aria-label='Open Menu' ><MdMenu /></button>
         </div>
         
         <div className='headcenter'>
          <img src={bitvestor} alt="header logo" />
         <p>BIT~VESTOR</p>
          
          </div>

          <div className='headright'>
             <button><FaBell/></button>
         <button  className='search-icon'><FaSearch/> </button>
           
         <div></div>
          <div></div>
          </div>

          </div>
      </header>
      <div>
       
      </div>
   </div  >
    
    </>
  );
}
