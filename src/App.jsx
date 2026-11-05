import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout/Layout';
import Inicio from './componentes/Inicio/Inicio';
import ProductosContainer from './componentes/Productos/ProductosContainer/ProductosContainer';
import { FormularioContainer } from './componentes/FormularioContainer/FormularioContainer';
import ProductosDetalle from './componentes/Productos/ProductosDetalle/ProductosDetalle';
import Cart from './componentes/Cart/Cart';
import EquipoContainer from './componentes/Equipo/EquipoContainer'; // Ajusta la ruta a tu archivo

function App() {
  return (
    <Routes>
      {/* Ruta contenedora que renderiza Layout (Header + Outlet + Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ProductosContainer Mensaje="Todos los Productos" />} />
        <Route path="/nosotros" element={<EquipoContainer />} />
        <Route path="/alta" element={<FormularioContainer />} />
        <Route path="/producto/:id" element={<ProductosDetalle />} />
        <Route path="/carrito" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;