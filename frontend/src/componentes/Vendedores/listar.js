import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Link } from 'react-router-dom';
const Listar = () => {
  const [vendedores, setVendedores] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const { token } = useAuth();

  const handleExcluirVendedor = async (vendedorId) => {
    try {
      const response = await fetch(`http://localhost:3000/vendedor/${vendedorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        const updatedVendedores = vendedores.filter((vendedor) => vendedor.id !== vendedorId);
        setVendedores(updatedVendedores);
        setMensagem('Vendedor excluído com sucesso!');
      } else {
        console.error('Erro ao excluir vendedor');
        setMensagem('Erro ao excluir vendedor');
      }
    } catch (error) {
      console.error('Erro ao excluir vendedor:', error);
      setMensagem('Erro ao excluir vendedor');
    }
  };


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/vendedor', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        const data = await response.json();
        setVendedores(data);
      } catch (error) {
        console.error("Erro ao buscar os vendedores:", error);
      }
    }

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Lista de Vendedores</h1>
      <span>{mensagem}</span>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Excluir Vendedor</th>
            <th>Atualizar Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {vendedores.map((vendedor) => (
            <tr key={vendedor.id}>
              <td>{vendedor.nome}</td>
              <td>{vendedor.cpf}</td>
              <td>{vendedor.email}</td>
              <td>{vendedor.telefone}</td>
              <td>
                <button onClick={() => handleExcluirVendedor(vendedor.id)}>
                  Excluir
                </button>
              </td>
              <td>
              <Link to={`/editarVendedor/${vendedor.id}`}>Atualizar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listar;
