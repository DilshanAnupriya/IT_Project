import React from 'react';
import Header from '../../Pabathi/pabathi_admin/Header'
import Sidebar from './Sidebar';
import './layout.css'; // Optional: Global layout CSS

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
