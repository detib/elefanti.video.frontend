import React, { useState, useEffect } from 'react';
import './Footer.scss';
import '../../shared/styles/shared.scss';
import { Link } from 'react-router-dom';


const Footer = () => {


    return (
      <div className='footer'>
         <div className='footer-header spread'>
            <Link to='/' className='logo-title inline'>  
              <h1>Elefanti Video</h1>
            </Link>
          </div>
    
          <div className='footer-last-row inline spread'>
            <div className='copyright'>
             <p>©ElefantiVideo 2022 | All Rights Reserved.</p>
            </div>
          </div>
      </div>
       
    );
  };

export default Footer;
