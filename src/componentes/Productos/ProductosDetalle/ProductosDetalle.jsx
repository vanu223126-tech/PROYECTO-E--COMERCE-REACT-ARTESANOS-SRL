import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config'; // Asegúrate de que esta ruta sea la correcta a tu config

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      
      try {
        
        const docRef = doc(db, "Productos", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProducto(null);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) return <h2>Cargando detalle del producto...</h2>;

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
      
      {}
      <p>{producto.descripcion || "Descripción no disponible."}</p>
      
      <p>Stock disponible: {producto.stock ?? "Consultar"}</p>
      
      {}
      <p>Categoría: {producto.categoria || "General"}</p>
      
      <Link to="/productos" style={{ marginTop: '15px', display: 'inline-block' }}>
        ← Volver a Productos
      </Link>
    </div>
  );
};

export default ProductoDetalle;