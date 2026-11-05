import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; 
import EquipoList from "./EquipoList";

const EquipoContainer = () => {
  const [equipo, setEquipo] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Equipo"));
        const listaEquipo = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Datos del equipo que llegaron de Firebase:", listaEquipo);
        setEquipo(listaEquipo);
      } catch (error) {
        console.error("Error al obtener el equipo:", error);
      } finally {
        setCargando(false);
      }
    };
   
    obtenerEquipo();
  }, []);

  if (cargando) return <h2 style={{ textAlign: "center", padding: "40px", color: "#fff" }}>Cargando equipo...</h2>;

  return <EquipoList equipo={equipo} />;
};

export default EquipoContainer;