import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Columna 1: Marca */}
        <div className={styles.columna}>
          <h3 className={styles.logo}>Artesanos SRL</h3>
          <p className={styles.descripcion}>
            Artículos de decoración únicos y artesanales para dar calidez a tus espacios.
          </p>
        </div>

        {/* Columna 2: Enlaces rápidos */}
        <div className={styles.columna}>
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto / Redes */}
        <div className={styles.columna}>
          <h4>Contacto</h4>
          <p>📍 Buenos Aires, Argentina</p>
          <p>📧 contacto@artesanossrl.com</p>
          <p>📱 WhatsApp de atención</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Artesanos SRL. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}