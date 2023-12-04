import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import Barra from "../../utils/Sorvete/barra_navegacao";

const Vendedores=()=>
{
    const[nome,setNome] = useState("");
    const[cpf,setCPF] = useState("");
    const[email,setEmail] = useState("");
    const[telefone,setTelefone] = useState("");

    const { token } = useAuth();
    const[mensagem,setMensagem] = useState("");


    const handleNome = (e) =>
    {
        setNome(e.target.value);
    }
    const handleCPF = (e) =>
    {
        setCPF(e.target.value);
    }

    const handleEmail = (e) =>
    {
        setEmail(e.target.value);
    }

    const handleTelefone = (e) =>
    {
        setTelefone(e.target.value);
    }


    const handleCadastrarVendedor = async () => {
       
        try {
           
          const response = await fetch('http://localhost:3000/vendedor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
            },
            body: JSON.stringify({ nome:nome,cpf:cpf,email:email,telefone:telefone }),
          });
      
          const data = await response.json();
          
          setMensagem(data.mensagem);
          
        } catch (error) {
          console.error('Erro ao cadastrar o Vendedor!');
        }
      };


    return(
        <div>
          <Barra/>
          
          

            <form>
                <span>{mensagem}</span>
                <br/>
                <label>Nome do funcionário</label>
                <input type="text" value={nome} onChange={handleNome}/>
                <br/>
                <label>CPF</label>
                <input type="number" value={cpf} onChange={handleCPF}/>
                <br/>
                <label>Email</label>
                <input type="text" value={email} onChange={handleEmail}/>
                <br/>
                <label>Telefone</label>
                <input type="number" value={telefone} onChange={handleTelefone}/>
                <br/>
                <button type="button" onClick={handleCadastrarVendedor}>Cadastrar Vendedor</button>

            </form>
        </div>
    )
}

export default Vendedores;