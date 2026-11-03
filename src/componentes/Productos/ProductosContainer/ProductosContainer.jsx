import { useEffect, useState } from "react";
import ProductosList from "../ProductosList/ProductosList.jsx";

function ProductosContainer({ Mensaje, soloDestacados = false }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
        const productosDB = collection(db, "productos")
        getDocs(productosDB)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                );
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

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