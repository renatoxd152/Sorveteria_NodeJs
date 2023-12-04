// Importando os módulos necessários
import { Route, Routes } from 'react-router-dom';
import Cadastrar from './componentes/cadastrar';
import Login from './componentes/login';
import Sorvetes from './componentes/sorvetes';

function App() {
  return (
    
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/sorvetes" element={<Sorvetes />} />
    </Routes>
  );
}

export default App;
