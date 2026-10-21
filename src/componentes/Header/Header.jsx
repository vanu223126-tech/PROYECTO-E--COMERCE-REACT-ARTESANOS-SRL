import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.marca}>
        <h1 className={styles.logo}>Artesanos SRL</h1>
        <p className={styles.subtitulo}>Artículos de Decoración</p>
      </div>

      <nav>
        <ul className={styles.nav}>
          <li>
            <Link to="/" className={styles.enlace}>Inicio</Link>
          </li>
          <li>
            <Link to="/productos" className={styles.enlace}>Productos</Link>
          </li>
          <li>
            <Link to="/destacados" className={styles.enlace}>Destacados</Link>
          </li>
          <li>
            <Link to="/alta" className={styles.enlace}>Alta de Productos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
