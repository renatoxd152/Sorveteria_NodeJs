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
      </Routes>
    </AuthProvider>
  );
}

export default App;
