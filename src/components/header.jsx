import React from 'react';
import { useState } from 'react';
import {FaHome, FaBell,  FaCog, FaSignOutAlt, FaSearch} from  'react-icons/fa';
import '../App.css';
import { MdMenu } from 'react-icons/md';
import bitvestor from '../assets/bitvestor.png';


export default function Header({ toggleSidebar }) {
    const[Open, setOpen] = useState(false);
    const toggleDropdown=()=>setOpen(!Open);
    
 
  return (
    <>
    <div className='headbar'>
      <header>
        <div className='heads'>
        <div className='headleft'>
         <button className='home' ><FaHome/></button>
         <button className='menu' onClick={toggleSidebar} aria-label='Open Menu' ><MdMenu /></button>
         <button  className='search-icon'><FaSearch/> </button>
         </div>
         
         <div className='headcenter'>
          <img src={bitvestor} alt="header logo" />
         <p>BIT~VESTOR</p>
          
          </div>

          <div className='headright'>
             <button><FaBell/></button>
            
          <div className='profavatar'>
          <img src='headright'  alt='logo' style={{objectFit:'cover'}} onClick={toggleDropdown}></img>
           
           {
            Open && (<ul className='profileDrop'>
              <li><FaCog/>Settings</li>
              <li><FaSignOutAlt/>log out</li>
            </ul>)
          }
          </div>
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
