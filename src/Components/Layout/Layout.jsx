import React from 'react';
import Style from './Layout.module.css';
import { Link, Outlet } from 'react-router-dom';

import { Offline, Online } from "react-detect-offline";
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';


export default function Layout() {
  return (
    <>
    <div className="container">

    <Navbar/>
        <Outlet />
      <div>
        <Offline>
          <div className="network">Only shown offline (surprise!)</div>
        </Offline>
      </div>
      <Footer/>
    </div>
    </>
  );
}
