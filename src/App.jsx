import React from 'react';
import Layout from './componentes/Layout/Layout';
import ProductosContainer from './componentes/Productos/ProductosContainer/ProductosContainer';
import { FormularioContainer } from './componentes/FormularioContainer/FormularioContainer';

function App() {
  return (
    <Layout>
      <ProductosContainer />
      <FormularioContainer />
    </Layout>
  );
}

export default App;
