import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Cadastrar from './componentes/cadastrar';
import Login from './componentes/login';
import Sorvetes from './componentes/Sorvete/sorvetes';
import ListarSorvetes from './componentes/Sorvete/listar_sorvetes';
import Vendedores from './componentes/Vendedores/vendedores';
import ListarVendedores from './componentes/Vendedores/listar_vendedores';
import Clientes from './componentes/Clientes/clientes';
import Compras from './componentes/Compras/compras';
import ListarCompras from './componentes/Compras/listar_compras';
import ListarClientes from './componentes/Clientes/listar';
import EditarSorvete from './componentes/Sorvete/editar_sorvete';
import EditarCliente from './componentes/Clientes/editar_cliente';
import EditarVendedor from './componentes/Vendedores/editar_vendedor';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/sorvetes" element={<Sorvetes />} />
        <Route path="/sorvetes/listar" element={<ListarSorvetes/>} />
        <Route path="/vendedores/cadastrar" element={<Vendedores/>} />
        <Route path="/vendedores/listarVendedores" element={<ListarVendedores/>} />
        <Route path="/clientes/cadastrar" element={<Clientes/>} />
        <Route path="/clientes/listarClientes" element={<ListarClientes/>} />
        <Route path="/clientes/listarClientes" element={<ListarClientes/>} />
        <Route path="/compras/cadastrar" element={<Compras/>} />
        <Route path="/compras/listarCompras" element={<ListarCompras/>} />
        <Route path="/editarSorvete/:id" element={<EditarSorvete/>} />
        <Route path="/editarCliente/:id" element={<EditarCliente/>} />
        <Route path="/editarVendedor/:id" element={<EditarVendedor/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
