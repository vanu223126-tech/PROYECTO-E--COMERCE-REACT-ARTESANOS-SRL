import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "./GestionCupones.module.css";

const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState("");
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const cuponesRef = collection(db, "cupones");

  // Leer cupones desde Firestore
  const obtenerCupones = async () => {
    try {
      setCargando(true);
      const snapshot = await getDocs(cuponesRef);
      const lista = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));
      setCupones(lista);
    } catch (error) {
      console.error("Error al cargar los cupones:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  // Crear nuevo cupón (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const codigoLimpio = codigo.trim().toUpperCase();
    const porcentajeNum = Number(descuento);

    if (!codigoLimpio) {
      alert("Ingresá un código de cupón.");
      return;
    }

    if (Number.isNaN(porcentajeNum) || porcentajeNum <= 0 || porcentajeNum > 100) {
      alert("Ingresá un porcentaje válido entre 1 y 100.");
      return;
    }

    try {
      setEnviando(true);
      const nuevoCupon = {
        codigo: codigoLimpio,
        descuento: porcentajeNum,
      };

      const docCreado = await addDoc(cuponesRef, nuevoCupon);

      
      setCupones((prev) => [...prev, { id: docCreado.id, ...nuevoCupon }]);
      setCodigo("");
      setDescuento("");
    } catch (error) {
      console.error("Error al crear el cupón:", error);
      alert("No se pudo guardar el cupón.");
    } finally {
      setEnviando(false);
    }
  };

  // Eliminar cupón (Delete)
  const handleEliminar = async (id, codigoCupon) => {
    const confirma = window.confirm(
      `¿Eliminar el cupón "${codigoCupon}"? Esta acción no se puede deshacer.`
    );
    if (!confirma) return;

    try {
      const cuponDocRef = doc(db, "cupones", id);
      await deleteDoc(cuponDocRef);
      setCupones((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el cupón:", error);
      alert("No se pudo eliminar el cupón.");
    }
  };

  return (
    <section className={styles.contenedor}>
      <h2 className={styles.titulo}>Gestión de Cupones — Artesanos SRL</h2>

      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.campo}>
          <label htmlFor="codigoCupon">Código del cupón</label>
          <input
            id="codigoCupon"
            type="text"
            placeholder="Ej: ARTESANO15"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="porcentajeCupon">Porcentaje de descuento (%)</label>
          <input
            id="porcentajeCupon"
            type="number"
            min="1"
            max="100"
            placeholder="Ej: 15"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={enviando} className={styles.btnCrear}>
          {enviando ? "Guardando..." : "Crear cupón"}
        </button>
      </form>

      <div className={styles.listaWrapper}>
        <h3>Cupones activos</h3>

        {cargando ? (
          <p className={styles.mensaje}>Cargando cupones...</p>
        ) : cupones.length === 0 ? (
          <p className={styles.mensaje}>No hay cupones cargados todavía.</p>
        ) : (
          <ul className={styles.lista}>
            {cupones.map((cupon) => (
              <li key={cupon.id} className={styles.item}>
                <div className={styles.infoCupon}>
                  <span className={styles.codigo}>{cupon.codigo}</span>
                  <span className={styles.porcentaje}>{cupon.descuento}% OFF</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleEliminar(cupon.id, cupon.codigo)}
                  className={styles.btnEliminar}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default GestionCupones;