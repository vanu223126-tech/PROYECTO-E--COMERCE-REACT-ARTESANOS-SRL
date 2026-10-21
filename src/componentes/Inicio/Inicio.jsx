import { Link } from "react-router-dom";
import ProductosContainer from "../Productos/ProductosContainer/ProductosContainer";
import styles from "./Inicio.module.css";

function Inicio() {
  return (
    <div className={styles.inicio}>
      {/* Portada */}
      <section className={styles.hero}>
        <h1 className={styles.titulo}>Artesanos SRL</h1>
        <p className={styles.bajada}>
          Artículos de decoración únicos para dar calidez a tus espacios.
        </p>
        <Link to="/productos" className={styles.boton}>
          Ver catálogo
        </Link>
      </section>

      {/* Beneficios */}
      <section className={styles.beneficios}>
        <div className={styles.beneficio}>
          <h3>Hecho a mano</h3>
          <p>Piezas artesanales con detalles únicos.</p>
        </div>
        <div className={styles.beneficio}>
          <h3>Envíos a todo el país</h3>
          <p>Recibí tu compra en tu casa.</p>
        </div>
        <div className={styles.beneficio}>
          <h3>Compra segura</h3>
          <p>Varios medios de pago disponibles.</p>
        </div>
      </section>

      {/* Productos destacados: cada tarjeta lleva a /producto/:id */}
      <section className={styles.destacados}>
        <ProductosContainer Mensaje="Productos destacados" soloDestacados />
      </section>
    </div>
  );
}

export default Inicio;