import React, { useState, useEffect } from 'react';
import styles from './Productos.module.css';
import { Link } from 'react-router-dom';

function Productos({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const { getCantidadActual } = useCart();

  const handleAddToCart = () => {
addToCart(producto, cantidad);
//alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
};
const [esFavorito, setEsFavorito] = useState(false);
const marcarComoFavorito = () => {
setEsFavorito(!esFavorito);
};

  return (
    <div>
      <h1>{Mensaje}</h1>
      <ul className={styles.listaProductos}>
        {productos.map((producto) => (
          <li key={producto.id} className={styles.itemProducto}>
            <Link to={`/producto/${producto.id}`}>
              <h2>{producto.nombre}</h2>
              <img src={producto.imagen} alt={producto.nombre} width="150" height="150" />
              <p>Precio: ${producto.precio}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;