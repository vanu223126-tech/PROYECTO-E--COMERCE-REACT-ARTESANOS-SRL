import React, { useState } from 'react';
import styles from './Productos.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';


function Productos({ id, nombre, precio, stock, imagen }) {
  const producto = { id, nombre, precio, stock, imagen };

  
  const { addToCart, getCantidadActual } = useCart();

  
  const [cantidad, setCantidad] = useState(1);

  
  const cantidadActual = getCantidadActual(producto.id);

  
  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
  };

  const [esFavorito, setEsFavorito] = useState(false);
  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className={styles.cardProducto || "card-producto"}>
      {}
      <img src={imagen} alt={nombre} style={{ width: '100px' }} />
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      
      {}
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Ya tenés {cantidadActual} unidades de este producto en el carrito.
      </p>

      {}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
        <button onClick={decrementar}>-</button>
        <p style={{ margin: '0 15px', fontWeight: 'bold' }}>{cantidad}</p>
        <button onClick={incrementar}>+</button>
      </div>

      <button onClick={handleAddToCart}>
        Agregar {cantidad} al carrito
      </button>
    </div>
  );
}

export default Productos;