import React from 'react';
import styles from './Equipo.module.css';

export default function TarjetaEquipo({ persona }) {
  return (
    <div className={styles.tarjetaEquipo}>
      <img src={persona.foto} alt={persona.nombre} className={styles.foto} />
      <h4>{persona.nombre}</h4>
      <p>{persona.rol}</p>
    </div>
  );
}
