import React from "react";
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
            <a href="#inicio" className={styles.enlace}>Inicio</a>
          </li>
          <li>
            <a href="#catalogo" className={styles.enlace}>Catálogo</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
