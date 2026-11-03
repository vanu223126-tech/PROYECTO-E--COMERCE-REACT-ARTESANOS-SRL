import { useEffect, useState } from "react";
import ProductosList from "../ProductosList/ProductosList.jsx";

function ProductosContainer({ Mensaje, soloDestacados = false }) {
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

        if (soloDestacados) {
          // Si el JSON tiene el campo "destacado", filtra por él; si no, toma los primeros 4
          const marcados = datos.filter((p) => p.destacado);
          setProductos(marcados.length > 0 ? marcados : datos.slice(0, 4));
        } else {
          setProductos(datos);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [soloDestacados]);

  if (cargando) return <p style={{ textAlign: "center", margin: "20px" }}>Cargando productos...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", margin: "20px" }}>Error: {error}</p>;

  return (
    <section>
      {Mensaje && <h2 style={{ textAlign: "center", margin: "20px" }}>{Mensaje}</h2>}
      <ProductosList productos={productos} />
    </section>
  );
}

export default ProductosContainer;