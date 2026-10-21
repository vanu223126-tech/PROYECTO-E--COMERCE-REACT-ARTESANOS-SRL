import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout/Layout';
import Inicio from './componentes/Inicio/Inicio';
import ProductosContainer from './componentes/Productos/ProductosContainer/ProductosContainer';
import { FormularioContainer } from './componentes/FormularioContainer/FormularioContainer';
import ProductosDetalle from './componentes/Productos/ProductosDetalle/ProductosDetalle';

function App() {
  return (
    <Routes>
      {/* Ruta contenedora que renderiza Layout (Header + Outlet + Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ProductosContainer Mensaje="Todos los Productos" />} />
        <Route path="/destacados" element={<ProductosContainer Mensaje="Productos Destacados" soloDestacados />} />
        <Route path="/alta" element={<FormularioContainer />} />
        <Route path="/producto/:id" element={<ProductosDetalle />} />
      </Route>
    </Routes>
  );
}

export default App;