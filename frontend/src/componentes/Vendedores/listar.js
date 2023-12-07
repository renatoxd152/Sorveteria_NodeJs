import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../utils/AuthContext";
const Listar = () => {
  const [vendedores, setVendedores] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const { token } = useAuth();
  const[erro,setErro] = useState("");
  const handleExcluirVendedor = async (vendedorId) => {
    try {
      const response = await fetch(`http://localhost:3000/vendedor/${vendedorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      const data = await response.json();
      console.log(data.flag);
      if (response.ok) {
        const updatedVendedores = vendedores.filter((vendedor) => vendedor.id !== vendedorId);
        setVendedores(updatedVendedores);
       
        if(data.flag == false)
        {
          setErro(data.mensagem);
          setMensagem("");
        }
        else
        {
          setMensagem(data.mensagem);
          
          setErro("");
        }
      } else {
        setErro(data.mensagem);
        setMensagem("");
      }
    } catch (error) {
      setErro('Erro ao excluir vendedor:', error);
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
      <div className={`alert ${mensagem ? 'alert-success' : 'd-none'}`} role="alert">
          {mensagem}
        </div>
        <div className={`alert ${erro ? 'alert-danger' : 'd-none'}`} role="alert">
          {erro}
        </div>
      <table className="table">
        <thead className="thead-dark">
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
                <button className="btn btn-danger" onClick={() => handleExcluirVendedor(vendedor.id)}>
                  Excluir
                </button>
              </td>
              <td>
                <Link to={`/editarVendedor/${vendedor.id}`} className="btn btn-primary">
                  Atualizar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listar;
