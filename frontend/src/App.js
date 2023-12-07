import { Route, Routes,Link } from 'react-router-dom';
import Clientes from './componentes/Clientes/clientes';
import EditarCliente from './componentes/Clientes/editar_cliente';
import ListarClientes from './componentes/Clientes/listar';
import Compras from './componentes/Compras/compras';
import ListarCompras from './componentes/Compras/listar_compras';
import EditarSorvete from './componentes/Sorvete/editar_sorvete';
import ListarSorvetes from './componentes/Sorvete/listar_sorvetes';
import Sorvetes from './componentes/Sorvete/sorvetes';
import EditarVendedor from './componentes/Vendedores/editar_vendedor';
import ListarVendedores from './componentes/Vendedores/listar_vendedores';
import Vendedores from './componentes/Vendedores/vendedores';
import Cadastrar from './componentes/cadastrar';
import Login from './componentes/login';
import { AuthProvider } from './utils/AuthContext';
import { PrivateRoute } from './utils/privateRoute';
import { useEffect,useState } from 'react';

function App() {

  const [pageTitle] = useState('Sorveteria');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/sorvetes" element={<PrivateRoute><Sorvetes /></PrivateRoute>} />
        <Route path="/sorvetes/listar" element={<PrivateRoute><ListarSorvetes/></PrivateRoute>} />
        <Route path="/vendedores/cadastrar" element={<PrivateRoute><Vendedores/></PrivateRoute>} />
        <Route path="/vendedores/listarVendedores" element={<PrivateRoute><ListarVendedores/></PrivateRoute>} />
        <Route path="/clientes/cadastrar" element={<PrivateRoute><Clientes/></PrivateRoute>} />
        <Route path="/clientes/listarClientes" element={<PrivateRoute><ListarClientes/></PrivateRoute>} />
        <Route path="/clientes/listarClientes" element={<PrivateRoute><ListarClientes/></PrivateRoute>} />
        <Route path="/compras/cadastrar" element={<PrivateRoute><Compras/></PrivateRoute>} />
        <Route path="/compras/listarCompras" element={<PrivateRoute><ListarCompras/></PrivateRoute>} />
        <Route path="/editarSorvete/:id" element={<PrivateRoute><EditarSorvete/></PrivateRoute>} />
        <Route path="/editarCliente/:id" element={<PrivateRoute><EditarCliente/></PrivateRoute>} />
        <Route path="/editarVendedor/:id" element={<PrivateRoute><EditarVendedor/></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
