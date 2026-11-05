import { useEffect, useState } from "react";
import ProductosList from "../ProductosList/ProductosList.jsx";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config';

function ProductosContainer({ Mensaje, soloDestacados = false }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ProductosDB = collection(db, "Productos");
    getDocs(ProductosDB)
      .then((resp) => {
        let listaProductos = resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        
        if (soloDestacados) {
          const categoriasBuscadas = ["madera", "yeso", "resina"];
          const productosFiltrados = [];

          categoriasBuscadas.forEach((cat) => {
            
            const encontrado = listaProductos.find(
              (prod) => prod.categoria && prod.categoria.toLowerCase() === cat
            );
            if (encontrado) {
              productosFiltrados.push(encontrado);
            }
          });

          listaProductos = productosFiltrados;
        }

        setProductos(listaProductos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
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