import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useParams, useNavigate } from 'react-router-dom';
import Barra from "../../utils/Sorvete/barra_navegacao";

const EditarVendedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const { token } = useAuth();
  const [mensagem, setMensagem] = useState("");

  const handleNome = (e) => {
    setNome(e.target.value);
  };

  const handleCPF = (e) => {
    setCPF(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleTelefone = (e) => {
    setTelefone(e.target.value);
  };

  const handleEditarVendedor = async () => {
    try {
      const response = await fetch(`http://localhost:3000/vendedor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ nome: nome, cpf: cpf, email: email, telefone: telefone  }),
      });

      const data = await response.json();
      voltar();
      setMensagem(data.mensagem);
    } catch (error) {
      console.error("Erro ao editar o Vendedor!");
    }
  };

  const voltar = () => {
    navigate("/vendedores/listarVendedores");
  };

  return (
    <div>
      <Barra />
      <h1>Editar Vendedor</h1>
      <form className="container mt-4">
        <span>{mensagem}</span>
        <br />
        <label>Nome do vendedor</label>
        <input type="text" className="form-control" value={nome} onChange={handleNome} />
        <br />
        <label>CPF</label>
        <input type="number" className="form-control" value={cpf} onChange={handleCPF} />
        <br />
        <label>Email</label>
        <input type="text" className="form-control" value={email} onChange={handleEmail} />
        <br />
        <label>Telefone</label>
        <input type="number" className="form-control" value={telefone} onChange={handleTelefone} />
        <br />
        <button type="button" className="btn btn-secondary me-2" onClick={voltar}>
          Voltar
        </button>
        <button type="button" className="btn btn-primary" onClick={handleEditarVendedor}>
          Editar Vendedor
        </button>
      </form>
    </div>
  );
}

export default EditarVendedor;
