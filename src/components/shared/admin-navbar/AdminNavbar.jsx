import React, { useState } from 'react';
import { FaTh, FaBars} from "react-icons/fa";
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { BiCategoryAlt } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import './AdminNavbar.scss';


const AdminNavbar = ({children}) => {

    
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"",
            name:"Dashboard",
            icon:<FaTh/>
        },
    
        {
            path:"",
            name:"Videos",
            icon:<BsFillPlayCircleFill/>
        },
       
        {
            path:"",
            name:"Categories",
            icon:<BiCategoryAlt/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "300px" : "70px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo"> Elefanti Video</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default AdminNavbar;