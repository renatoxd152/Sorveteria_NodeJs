import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";
const Listar = () => {
  const [clientes, setClientes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const { token } = useAuth();
  const[erro,setErro] = useState("");
  const handleExcluirCliente = async (clienteId) => {
    try {
      const response = await fetch(`http://localhost:3000/cliente/${clienteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        const updatedClientes = clientes.filter((cliente) => cliente.id !== clienteId);
        setClientes(updatedClientes);
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
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      setMensagem("Erro ao excluir cliente");
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/cliente", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar os clientes:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Lista de Clientes</h1>
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
            <th>Excluir Cliente</th>
            <th>Atualizar Cliente</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleExcluirCliente(cliente.id)}
                >
                  Excluir
                </button>
              </td>
              <td>
                <Link to={`/editarCliente/${cliente.id}`} className="btn btn-primary">
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
