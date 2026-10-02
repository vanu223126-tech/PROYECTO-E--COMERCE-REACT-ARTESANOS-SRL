import { useEffect, useState } from "react";
import ProductosList from "../ProductosList/ProductosList.jsx";

function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch("/data/productos.json");

        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información");
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) return <p style={{ textAlign: "center", margin: "20px" }}>Cargando productos...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", margin: "20px" }}>Error: {error}</p>;

  return <ProductosList productos={productos} />;
}

export default ProductosContainer;