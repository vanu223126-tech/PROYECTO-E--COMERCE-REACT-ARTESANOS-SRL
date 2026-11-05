import styles from "./Equipo.module.css";

const TarjetaEquipo = ({ miembro }) => {
  
  const nombreMiembro = miembro.nombre || miembro.Nombre || "Miembro del equipo";
  const linkedin = miembro.linkedinURL;

  return (
    <div className={styles.tarjetaEquipo}>
      {miembro.fotoURL && (
        <img 
          src={miembro.fotoURL} 
          alt={nombreMiembro} 
          className={styles.foto} 
        />
      )}
      
      <h3 style={{ fontSize: "15px", margin: "8px 0 4px 0", color: "#fff" }}>
        {nombreMiembro}
      </h3>
      
      <h4 style={{ fontSize: "12px", color: "#aaa", margin: "0 0 6px 0" }}>
        {miembro.rol || miembro.puesto}
      </h4>
      
      {miembro.descripcion && (
        <p style={{ fontSize: "11px", margin: "0 0 8px 0", color: "#ddd" }}>
          {miembro.descripcion}
        </p>
      )}

      {}
      {linkedin && (
        <a 
          href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: "11px", color: "#ffcc00", textDecoration: "none", fontWeight: "600" }}
        >
          LinkedIn 🔗
        </a>
      )}
    </div>
  );
};

export default TarjetaEquipo;