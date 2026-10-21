import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    
    fetch('/data/productos.json')
      .then(response => response.json())
      .then(data => {
        
        const productoEncontrado = data.find(p => String(p.id) === String(id));
        setProducto(productoEncontrado);
        setCargando(false);
      })
      .catch(error => {
        console.error("Error al cargar el producto:", error);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <h2>Cargando detalle del producto...</h2>;
  }

  if (!producto) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Producto no encontrado.</h2>
        <Link to="/productos">← Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Detalle del Producto: {producto.nombre}</h2>
      {producto.imagen && (
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          style={{ maxWidth: '400px', width: '100%', borderRadius: '8px' }} 
        />
      )}
      <h3>${producto.precio?.toLocaleString("es-AR")}</h3>
      <p>{producto.descripcion}</p>
      <p>Stock disponible: {producto.stock}</p>
      <p>Categoría: {producto.categoria}</p>
      
      <Link to="/productos" style={{ marginTop: '15px', display: 'inline-block' }}>
        ← Volver a Productos
      </Link>
    </div>
  );
};

export default ProductoDetalle;