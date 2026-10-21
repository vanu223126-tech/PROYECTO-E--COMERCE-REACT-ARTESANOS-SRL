import React from "react";
import { Link } from "react-router-dom";
import styles from "./TarjetaProducto.module.css";

function TarjetaProducto({ id, imagen, nombre, precio, stock }) {
  return (
    <article className={styles.tarjeta}>
      {/* Redirige al detalle del producto al hacer clic en la imagen o título */}
      <Link to={`/producto/${id}`} className={styles.enlaceDetalle}>
        <img className={styles.imagen} src={imagen} alt={nombre} />
      </Link>

      <div className={styles.contenido}>
        <Link to={`/producto/${id}`} className={styles.enlaceDetalle}>
          <h3 className={styles.nombre}>{nombre}</h3>
        </Link>

        <p className={styles.precio}>
          ${precio ? precio.toLocaleString("es-AR") : "0"}
        </p>

        <p className={styles.Stock}>Stock: {stock}</p>

        <div className={styles.acciones}>
          <Link to={`/producto/${id}`} className={styles.botonDetalle}>
            Ver detalle
          </Link>
          <button className={styles.button}>Agregar al carrito</button>
        </div>
      </div>
    </article>
  );
}

export default TarjetaProducto;