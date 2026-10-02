import React from 'react';
import EquipoContainer from '../Equipo/EquipoContainer';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.empresaInfo}>
        <h3>Artesanos SRL</h3>
        <p>Decoración artesanal en yeso, madera y resina</p>
        <p>📍 Buenos Aires, Argentina | ✉️ contacto@artesanos.com.ar</p>
      </div>

      <div className={styles.equipoSeccion}>
        <EquipoContainer />
      </div>

      <div className={styles.copyright}>
        <p>© 2026 ArtesanosSRL - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;