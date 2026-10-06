import React, { useState } from 'react';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto';

export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: '',
    precio: '',
    stock: ''
  });

  const [imagenFile, setImagenFile] = useState(null);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: value
    });
  };

  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (!imagenFile) {
      alert('Por favor, selecciona una imagen para el producto.');
      return;
    }

    const apiKey = '2b543fa8fdd060931ce60a40a55da100'; 
    const formData = new FormData();
    formData.append('image', imagenFile);

    try {
      console.log('Subiendo imagen a Imgbb...');
      const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        console.log('Imagen subida con éxito. URL:', datosImgbb.data.url);

        const productoCompleto = {
          nombre: datosForm.nombre,
          precio: Number(datosForm.precio),
          stock: Number(datosForm.stock),
          imagen: datosImgbb.data.url 
        };

        console.log('Enviando los siguientes datos COMPLETOS a la API:', productoCompleto);
        alert('¡Producto creado con éxito!');

        
        setDatosForm({ nombre: '', precio: '', stock: '' });
        setImagenFile(null);
      } else {
        throw new Error('La subida de la imagen a Imgbb falló.');
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al procesar el formulario. Por favor, intentá de nuevo.");
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
    />
  );
}