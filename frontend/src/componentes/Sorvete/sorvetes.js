import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import Barra from "../../utils/Sorvete/barra_navegacao";

const Sorvetes=()=>
{
    const[nome,setNome] = useState("");
    const[quantidade,setQuantidade] = useState("");
    const[preco,setPreco] = useState("");

    const { token } = useAuth();
    const[mensagem,setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const handleNome = (e) =>
    {
        setNome(e.target.value);
    }
    const handleQuantidade = (e) =>
    {
        setQuantidade(e.target.value);
    }

    const handlePreco = (e) =>
    {
        setPreco(e.target.value);
    }


    const handleCadastrarSorvete = async () => {
      if (!nome || !quantidade || !preco) {
        setErro("Por favor, preencha todos os campos.");
        return;
      }
      if (isNaN(Number(quantidade)) || isNaN(Number(preco))) {
        setErro("Quantidade e preço devem ser números válidos.");
        return;
      }
    
      if (quantidade < 0) {
        setErro("A quantidade não pode ser negativa.");
        return;
      }
    
      if (preco < 0) {
        setErro("O preço não pode ser negativo.");
        return;
      }
        try {
           
          const response = await fetch('http://localhost:3000/sorvetes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
            },
            body: JSON.stringify({ nome:nome,quantidade:quantidade,preco:preco }),
          });
      
          const data = await response.json();
          
          setMensagem(data.mensagem);
          setErro("");
        } catch (error) {
          console.error('Erro ao cadastrar o sorvete!');
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
            <label>Nome do sorvete</label>
            <input type="text" className="form-control" value={nome} onChange={handleNome} />
            <br />
            <label>Quantidade</label>
            <input type="number" className="form-control" value={quantidade} onChange={handleQuantidade} />
            <br />
            <label>Preço</label>
            <input type="number" className="form-control" value={preco} onChange={handlePreco} />
            <br />
            <button type="button" className="btn btn-primary" onClick={handleCadastrarSorvete}>
              Cadastrar Sorvete
            </button>
          </form>
        </div>
      );
    };

export default Sorvetes;