import React from "react";
import TarjetaProducto from "../../TarjetaProducto/TarjetaProducto.jsx";
import styles from "./ProductosList.module.css";

function ProductosList({ productos }) {
  return (
    <div className={styles.contenedor}>
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          imagen={producto.imagen}
          nombre={producto.nombre}
          precio={producto.precio}
          stock={producto.stock}
        />
      ))}
    </div>
  );
}

export default ProductosList;