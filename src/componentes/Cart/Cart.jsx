import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>El carrito está vacío</h2>
        <p>Agrega productos para continuar la compra.</p>
        <Link to="/productos">Ir a Productos</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Carrito de Compras</h1>
      {cart.map(item => (
        <div key={item.id} style={{ borderBottom: '1px solid #ccc', margin: '10px 0', paddingBottom: '10px' }}>
          <h4>{item.nombre}</h4>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${item.precio * item.quantity}</p>
        </div>
      ))}
      <hr />
      <h3>Total a pagar: ${getCartTotal()}</h3>
      <button onClick={clearCart} style={{ marginRight: '10px' }}>Vaciar Carrito</button>
      <Link to="/productos">Seguir comprando</Link>
    </div>
  );
};

export default Cart;