import TarjetaEquipo from "./TarjetaEquipo";
import styles from "./Equipo.module.css";

const EquipoList = ({ equipo }) => {
  return (
    <section style={{ padding: "30px 20px", textAlign: "center" }}>
      <h2 style={{ color: "#222", marginBottom: "8px", fontSize: "28px" }}>
        Nuestro Equipo
      </h2>
      <p style={{ color: "#555", marginBottom: "30px", fontSize: "16px" }}>
        Conoce a las personas detrás de Artesanos SRL
      </p>

      <div className={styles.equipoGrid}>
        {equipo.map((miembro) => (
          <TarjetaEquipo key={miembro.id} miembro={miembro} />
        ))}
      </div>
    </section>
  );
};

export default EquipoList;