import React, { useState } from 'react';
import FormularioProducto from '../FormularioProducto/FormularioProducto';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: ''
  });
  const [imagenFile, setImagenFile] = useState(null);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm((datosActuales) => ({
      ...datosActuales,
      [name]: value
    }));
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    try {
      if (!imagenFile) {
        throw new Error('Debe seleccionar una imagen.');
      }

      const productoCompleto = {
        ...datosForm,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        imagen: imagenFile.name
      };

      console.log('Enviando producto a Firebase:', productoCompleto);

      const db = getFirestore();
      const productosCollection = collection(db, 'Productos');
      await addDoc(productosCollection, productoCompleto);

      setDatosForm({
        nombre: '',
        precio: '',
        stock: '',
        categoria: ''
      });
      setImagenFile(null);
    } catch (error) {
      console.error('Error en el proceso de envío:', error);
      alert('Hubo un error al subir la imagen. Por favor, intentá de nuevo.');
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      setImagenFile={setImagenFile}
    />
  );
}