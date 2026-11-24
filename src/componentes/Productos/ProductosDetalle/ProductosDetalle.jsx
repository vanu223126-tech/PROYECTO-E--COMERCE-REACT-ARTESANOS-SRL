import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const ProductosDetalle = () => {
  const { id } = useParams();
  const [prod, setItem] = useState(null);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "Producto", id);

      getDoc(docRef)
        .then((resp) => {
          if (resp.exists()) {
            setItem({ ...resp.data(), id: resp.id });
          } else {
            console.log("No se encontró el producto");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  return (
    <div className="CartaDetalle">
      {prod ? (
        <>
          <h2>{prod.nombre}</h2>
          <p>{prod.descripcion}</p>
          <p>Precio: ${prod.precio}</p>
        </>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default ProductosDetalle;
