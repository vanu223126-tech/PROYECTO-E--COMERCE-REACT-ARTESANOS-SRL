import React from 'react';
import styles from './FormularioProducto.module.css';

function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  modoEdicion = false,
  onCancelar
}) {
  return (
    <form onSubmit={manejarEnvio} className={styles.formulario}>
      <h3>{modoEdicion ? "Editar producto" : "Agregar nuevo producto"}</h3>

      {modoEdicion && (
        <div>
          <label htmlFor="id">ID del documento: </label>
          <input
            id="id"
            type="text"
            name="id"
            value={datosForm.id || ""}
            disabled
          />
        </div>
      )}

      <div>
        <label htmlFor="nombre">Nombre del producto: </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          placeholder="Ej: Teclado mecánico"
          value={datosForm.nombre || ""}
          onChange={manejarCambio}
          required
          minLength={3}
          maxLength={80}
        />
      </div>

      <div>
        <label htmlFor="precio">Precio: </label>
        <input
          id="precio"
          type="number"
          name="precio"
          placeholder="Ej: 95"
          value={datosForm.precio ?? ""}
          onChange={manejarCambio}
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="stock">Stock: </label>
        <input
          id="stock"
          type="number"
          name="stock"
          placeholder="Ej: 5"
          value={datosForm.stock ?? ""}
          onChange={manejarCambio}
          min="0"
          step="1"
          required
        />
      </div>

      <div>
        <label htmlFor="imagen">Imagen (URL): </label>
        <input
          id="imagen"
          type="url"
          name="imagen"
          placeholder="https://..."
          value={datosForm.imagen || ""}
          onChange={manejarCambio}
        />
        {modoEdicion && datosForm.imagen && (
          <div>
            <p>Imagen actual:</p>
            <img
              src={datosForm.imagen}
              alt={datosForm.nombre || "Vista previa del producto"}
              style={{ width: "100px" }}
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="detalles">Descripción del producto: </label>
        <input
          id="detalles"
          type="text"
          name="detalles"
          placeholder="Ej: Teclado mecánico gamer ..."
          value={datosForm.detalles || ""}
          onChange={manejarCambio}
          required
          minLength={10}
          maxLength={80}
        />
      </div>

      <div>
        <label htmlFor="oferta">Producto en oferta</label>
        <input
          id="oferta"
          type="checkbox"
          name="oferta"
          checked={Boolean(datosForm.oferta)}
          onChange={manejarCambio}
        />
      </div>

      <button type="submit">
        {modoEdicion ? "Actualizar producto" : "Guardar producto"}
      </button>

      {modoEdicion && (
        <button type="button" onClick={onCancelar}>
          Cancelar edición
        </button>
      )}
    </form>
  );
}

export default FormularioProducto;