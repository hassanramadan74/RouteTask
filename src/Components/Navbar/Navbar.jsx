import React, { useContext, useEffect  ,useState} from 'react';
import Style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'




export default function Navbar() {

  
  return <>
<nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="E-commerce Logo" width={100} />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
      <li className="nav-item d-flex align-items-center">
        <i className=' fab fa-facebook mx-2 text-dark'></i>
        <i className=' fab fa-twitter mx-2 text-dark'></i>
        <i className=' fab fa-instagram mx-2 text-dark'></i>
        <i className=' fab fa-tiktok mx-2 text-dark'></i>
        <i className=' fab fa-youtube mx-2 text-dark'></i>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </>
}
