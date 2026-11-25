import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Cart = () => {
  const { cart, clearCart, getCartTotal, removeItem } = useCart();

  const [codigoInput, setCodigoInput] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(null); 
  const [mensajeCupon, setMensajeCupon] = useState('');
  const [buscandoCupon, setBuscandoCupon] = useState(false);

  const subtotal = Number(getCartTotal()) || 0;
  const porcentajeDescuento = cuponAplicado ? Number(cuponAplicado.descuento) || 0 : 0;
  const montoDescuento = Math.round((subtotal * porcentajeDescuento) / 100);
  const totalFinal = Math.max(0, subtotal - montoDescuento);

  const handleAplicarCupon = async (e) => {
    e.preventDefault();
    const codigoLimpio = codigoInput.trim().toUpperCase();

    if (!codigoLimpio) {
      setMensajeCupon('Ingresá un código de cupón.');
      return;
    }

    setBuscandoCupon(true);
    setMensajeCupon('');

    try {
      const cuponesRef = collection(db, 'cupones');
      const q = query(cuponesRef, where('codigo', '==', codigoLimpio));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setCuponAplicado(null);
        setMensajeCupon('El cupón ingresado no existe.');
      } else {
        const docData = snapshot.docs[0].data();
        setCuponAplicado({
          codigo: docData.codigo,
          descuento: Number(docData.descuento) || 0,
        });
        setMensajeCupon(`Cupón ${docData.codigo} aplicado (${docData.descuento}\% OFF).`); } } catch (error) { console.error('Error al buscar el cupón:', error); setMensajeCupon('Ocurrió un error al validar el cupón.'); } finally { setBuscandoCupon(false); } };  const handleQuitarCupon = () => { setCuponAplicado(null); setCodigoInput(''); setMensajeCupon(''); };  const handleFinalizarCompra = () => { handleQuitarCupon(); clearCart(); alert(`Gracias por comprar. Total abonado: $${totalFinal}`);
  };

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
      {cart.map((item) => (
        <div
          key={item.id}
          style={{ borderBottom: '1px solid #ccc', margin: '10px 0', paddingBottom: '10px' }}
        >
          <h4>{item.nombre}</h4>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${item.precio * item.quantity}</p>

          <button
            onClick={() => removeItem(item.id)}
            className="btn-eliminar"
            style={{
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Eliminar producto
          </button>

          <hr />
        </div>
      ))}

      <form onSubmit={handleAplicarCupon} style={{ margin: '15px 0' }}>
        <label htmlFor="codigoCupon">Código de descuento: </label>
        <input
          id="codigoCupon"
          type="text"
          value={codigoInput}
          onChange={(e) => setCodigoInput(e.target.value)}
          placeholder="Ej: ARTESANO10"
          style={{ padding: '6px', marginRight: '8px' }}
        />
        <button type="submit" disabled={buscandoCupon}>
          {buscandoCupon ? 'Validando...' : 'Aplicar cupón'}
        </button>
        {cuponAplicado && (
          <button
            type="button"
            onClick={handleQuitarCupon}
            style={{ marginLeft: '8px' }}
          >
            Quitar cupón
          </button>
        )}
      </form>

      {mensajeCupon && <p>{mensajeCupon}</p>}

      <p>Subtotal: ${subtotal}</p>
      {cuponAplicado && (
        <p>
          Descuento ({cuponAplicado.codigo} - {porcentajeDescuento}%): -${montoDescuento}
        </p>
      )}
      <h3>Total a pagar: ${totalFinal}</h3>

      <button
        onClick={() => {
          handleQuitarCupon();
          clearCart();
        }}
        className="btn-vaciar"
      >
        Vaciar Carrito
      </button>

      <Link
        to="/"
        onClick={handleFinalizarCompra}
        className="btn-finalizar"
        style={{ marginLeft: '10px' }}
      >
        Finalizar Compra
      </Link>
    </div>
  );
};

export default Cart;