import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

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
            <Link to="/nosotros" className={styles.enlace}>Sobre Nosotros</Link>
          </li>

          {user?.rol === "admin" && (
            <>
              <li>
                <Link to="/admin/cupones" className={styles.enlace}>Gestión de Cupones</Link>
              </li>
              <li>
                <Link to="/alta" className={styles.enlace}>Alta de Productos</Link>
              </li>
            </>
          )}

          {!user ? (
            <>
              <li>
                <Link to="/login" className={styles.enlace}>Login</Link>
              </li>
              <li>
                <Link to="/registro" className={styles.enlace}>Registro</Link>
              </li>
            </>
          ) : (
            <li>
              <button
                  type="button"
                 onClick={handleLogout}
                className={`${styles.enlace} ${styles.botonSalir}`}
                 >
                 Cerrar sesión
              </button>
            </li>
          )}

          <li>
            <Link to="/carrito" className={styles.enlace}>
              Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}