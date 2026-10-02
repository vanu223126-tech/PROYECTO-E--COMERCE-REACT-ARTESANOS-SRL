import React from 'react';
import styles from './FormularioProducto.module.css';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen }) {
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio}>
      <h3 className={styles.titulo}>Agregar Nuevo Producto</h3>

      <div className={styles.campo}>
        <label className={styles.label}>Nombre del Producto:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Ej: Set de 6 Budas"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label className={styles.label}>Precio: $</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 5000"
          name="precio"
          value={datosForm.precio}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label className={styles.label}>Stock:</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 10"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className={styles.campo}>
        <label className={styles.label}>Imagen:</label>
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          name="imagen"
          onChange={manejarCambioImagen}
          required
        />
      </div>

      <button className={styles.boton} type="submit">
        Guardar Producto
      </button>
    </form>
  );
}