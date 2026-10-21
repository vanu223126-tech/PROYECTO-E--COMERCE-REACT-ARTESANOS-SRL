import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {/* Marcador de posición dinámico para las rutas hijas */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
