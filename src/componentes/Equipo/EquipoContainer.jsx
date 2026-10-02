import React, { useState, useEffect } from 'react';
import EquipoList from './EquipoList';

export default function EquipoContainer() {
  const [integrantes, setIntegrantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        const respuesta = await fetch("/data/equipo.json");

        if (!respuesta.ok) {
          throw new Error('No se pudo cargar la información del equipo');
        }

        const datos = await respuesta.json();
        setIntegrantes(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerEquipo();
  }, []);

  if (cargando) return <p style={{ textAlign: 'center', color: '#ccc' }}>Cargando equipo...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;

  return <EquipoList integrantes={integrantes} />;
}