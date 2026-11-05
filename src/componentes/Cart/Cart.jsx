import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  
  const { cart, clearCart, getCartTotal, removeItem } = useCart();

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
          
          {}
          <button 
            onClick={() => removeItem(item.id)} 
            className="btn-eliminar"
            style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
          >
            Eliminar producto
          </button>
          
          <hr />
        </div>
      ))}
      
      <h3>Total a pagar: ${getCartTotal()}</h3>
      
      <button onClick={clearCart} className="btn-vaciar">Vaciar Carrito</button>
      
      {}
      <Link to="/" onClick={() => alert("Gracias por comprar")} className="btn-finalizar">
        Finalizar Compra
      </Link>
    </div>
  );
};

export default Cart;