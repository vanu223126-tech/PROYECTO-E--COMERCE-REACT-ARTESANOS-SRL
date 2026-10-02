import React from 'react';
import TarjetaEquipo from './TarjetaEquipo';
import styles from './Equipo.module.css';

export default function EquipoList({ integrantes }) {
  return (
    <div className={styles.equipoGrid}>
      {integrantes.map((persona) => (
        <TarjetaEquipo key={persona.id} persona={persona} />
      ))}
    </div>
  );
}