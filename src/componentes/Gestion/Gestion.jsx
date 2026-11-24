import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const estadoInicialForm = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
  imagen: "",
};

const Gestion = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm({
        nombre: productoAEditar.nombre || "",
        categoria: productoAEditar.categoria || "",
        precio: productoAEditar.precio ?? "",
        stock: productoAEditar.stock ?? "",
        imagen: productoAEditar.imagen || "",
      });
    } else {
      setDatosForm(estadoInicialForm);
    }
  }, [productoAEditar]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosRef = collection(db, "Productos");
      const resp = await getDocs(productosRef);
      setProductos(
        resp.docs.map((productoDoc) => ({
          ...productoDoc.data(),
          id: productoDoc.id,
        }))
      );
    };

    fetchProductos();
  }, []);

  const handleEditClick = (producto) => {
    setProductoAEditar(producto);
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
    setImagenFile(null);
    setDatosForm(estadoInicialForm);
  };

  const manejarCambio = (e) => {
  const { name, value, type, checked } = e.target;
  setDatosForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const precioNum = Number(datosForm.precio);
    const stockNum = Number(datosForm.stock);

    if (!datosForm.nombre.trim() || Number.isNaN(precioNum) || precioNum <= 0) {
      alert(
        "Completá el nombre del producto y asegurate de que el precio sea mayor a cero."
      );
      return;
    }

    let urlImagen = datosForm.imagen;

    if (imagenFile) {
      const formData = new FormData();
      formData.append("image", imagenFile);
      const apiKey = "2b543fa8fdd060931ce60a40a55da100";

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.success) {
          urlImagen = data.data.url;
        } else {
          throw new Error("La subida de la imagen falló.");
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert(
          "Hubo un error al subir la imagen. Por favor, intentá de nuevo."
        );
        return;
      }
    }

    const productoFinal = {
      ...datosForm,
      precio: precioNum,
      stock: Number.isNaN(stockNum) ? 0 : stockNum,
      imagen: urlImagen,
    };

    try {
      if (productoAEditar) {
        const docRef = doc(db, "Productos", productoAEditar.id);
        await updateDoc(docRef, productoFinal);
        setProductos((prev) =>
          prev.map((prod) =>
            prod.id === productoAEditar.id
              ? { ...productoFinal, id: productoAEditar.id }
              : prod
          )
        );
        alert("Producto actualizado con éxito.");
        setProductoAEditar(null);
      } else {
        const docCreado = await addDoc(
          collection(db, "Productos"),
          productoFinal
        );
        setProductos((prev) => [
          ...prev,
          { ...productoFinal, id: docCreado.id },
        ]);
        alert("Producto guardado con éxito.");
      }

      setDatosForm(estadoInicialForm);
      setImagenFile(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este producto?"
    );
    if (confirmacion) {
      const docRef = doc(db, "Productos", id);
      await deleteDoc(docRef);
      setProductos((prev) => prev.filter((prod) => prod.id !== id));
      if (productoAEditar?.id === id) {
        setProductoAEditar(null);
      }
      alert("Producto eliminado.");
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <hr />
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        setImagenFile={setImagenFile}
        modoEdicion={!!productoAEditar}
      />
      {productoAEditar && (
        <button type="button" onClick={cancelarEdicion}>
          Cancelar Edición
        </button>
      )}
      <hr />
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            {prod.nombre} - ${prod.precio}
            <button type="button" onClick={() => handleEditClick(prod)}>
              Editar
            </button>
            <button type="button" onClick={() => handleDelete(prod.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gestion;