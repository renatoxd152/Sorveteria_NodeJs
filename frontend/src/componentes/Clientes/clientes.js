import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import Barra from "../../utils/Sorvete/barra_navegacao";

const Clientes = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const { token } = useAuth();
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
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

  const handleCadastrarCliente = async () => {
    if (!nome || !cpf || !email || !telefone) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ nome: nome, cpf: cpf, email: email, telefone: telefone }),
      });

      const data = await response.json();

      setMensagem(data.mensagem);
      setErro("");
    } catch (error) {
      console.error("Erro ao cadastrar o Cliente!");
    }
  };

  return (
    <div>
      <Barra />

      <form className="container mt-4">
      <div className={`alert ${mensagem ? 'alert-success' : 'd-none'}`} role="alert">
          {mensagem}
        </div>
        <div className={`alert ${erro ? 'alert-danger' : 'd-none'}`} role="alert">
          {erro}
        </div>
        <br />
        <label>Nome do cliente</label>
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
        
        <button type="button" className="btn btn-primary" onClick={handleCadastrarCliente}>
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
};

export default Clientes;
