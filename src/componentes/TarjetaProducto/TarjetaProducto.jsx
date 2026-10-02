import React from "react";
import styles from "./TarjetaProducto.module.css";

function TarjetaProducto({ imagen, nombre, precio, stock }) {
  return (
    <article className={styles.tarjeta}>
      <img className={styles.imagen} src={imagen} alt={nombre} />

      <div className={styles.contenido}>
        <h3 className={styles.nombre}>{nombre}</h3>

        <p className={styles.precio}>
          ${precio ? precio.toLocaleString("es-AR") : "0"}
        </p>

        <p className={styles.Stock}>Stock: {stock}</p>

        <button className={styles.button}>Agregar al carrito</button>
      </div>
    </article>
  );
}

export default TarjetaProducto;