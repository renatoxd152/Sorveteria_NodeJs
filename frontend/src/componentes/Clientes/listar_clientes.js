import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";

const Listar = () => {
  const [clientes, setClientes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const { token } = useAuth();

  const handleExcluirCliente = async (clienteId) => {
    try {
      const response = await fetch(`http://localhost:3000/cliente/${clienteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const updatedClientes = clientes.filter((cliente) => cliente.id !== clienteId);
        setClientes(updatedClientes);
        setMensagem("Cliente excluído com sucesso!");
      } else {
        console.error("Erro ao excluir cliente");
        setMensagem("Erro ao excluir cliente");
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      setMensagem("Erro ao excluir cliente");
    }
  };

  const handleAtualizarCliente = async (clienteId) => {
    try {
      // Substitua 'POST' pelo método HTTP correto para atualizar um cliente
      const response = await fetch(`http://localhost:3000/cliente/${clienteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const updatedClientes = clientes.filter((cliente) => cliente.id !== clienteId);
        setClientes(updatedClientes);
        setMensagem("Cliente atualizado com sucesso!");
      } else {
        console.error("Erro ao atualizar o cliente");
        setMensagem("Erro ao atualizar o cliente");
      }
    } catch (error) {
      console.error("Erro ao atualizar o cliente:", error);
      setMensagem("Erro ao atualizar o cliente");
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
      <span>{mensagem}</span>
      <table>
        <thead>
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
                <button onClick={() => handleExcluirCliente(cliente.id)}>
                  Excluir
                </button>
              </td>
              <td>
                <button onClick={() => handleAtualizarCliente(cliente.id)}>
                  Atualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listar;
