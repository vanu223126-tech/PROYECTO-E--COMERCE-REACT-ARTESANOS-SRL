import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TarjetaProducto.module.css";
import { useCart } from "../../context/CartContext";

function TarjetaProducto({ id, imagen, nombre, precio, stock }) {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    const producto = { id, nombre, precio, stock, imagen };
    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} unidad(es) de ${nombre} al carrito.`);
  };

  return (
    <article className={styles.tarjeta}>
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
          {}
          <button className={styles.button} onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default TarjetaProducto;