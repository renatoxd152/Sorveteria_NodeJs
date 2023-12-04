import React, { useState, useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";

const SelectClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/cliente", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
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

  const handleSelectChange = (event) => {
    const selectedCliente = event.target.value;
    setCliente(selectedCliente);
  };

  return (
    <select value={cliente} onChange={handleSelectChange}>
      <option value="">Selecione um cliente</option>
      {clientes.map((cliente) => (
        <option key={cliente.id} value={cliente.id}>
          {cliente.nome}
        </option>
      ))}
    </select>
  );
};

export default SelectClientes;
