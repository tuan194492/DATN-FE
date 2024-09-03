import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from '../routes';

const Layout = () => {
  return (
    <Router>
      <div className="layout">
        <Header />
        <main className="content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
