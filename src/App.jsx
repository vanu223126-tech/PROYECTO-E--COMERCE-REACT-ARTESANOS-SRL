import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout/Layout';
import Inicio from './componentes/Inicio/Inicio';
import ProductosContainer from './componentes/Productos/ProductosContainer/ProductosContainer';
import ProductosDetalle from './componentes/Productos/ProductosDetalle/ProductosDetalle';
import Cart from './componentes/Cart/Cart';
import EquipoContainer from './componentes/Equipo/EquipoContainer';
import Gestion from './componentes/Gestion/Gestion';
import GestionCupones from './componentes/Gestion/GestionCupones';
import Login from './componentes/Login/Login';
import Registro from "./componentes/Registro/Registro";
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ProductosContainer Mensaje="Todos los Productos" />} />
        <Route path="/nosotros" element={<EquipoContainer />} />
        <Route path="/producto/:id" element={<ProductosDetalle />} />
        <Route path="/carrito" element={<Cart />} />

        <Route
          path="/alta"
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <Gestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cupones"
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <GestionCupones />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;