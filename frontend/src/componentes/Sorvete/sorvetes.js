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
          
        } catch (error) {
          console.error('Erro ao cadastrar o sorvete!');
        }
      };


    return(
        <div>
          <Barra/>
          
          

            <form>
                <span>{mensagem}</span>
                <br/>
                <label>Nome do sorvete do sorvete</label>
                <input type="text" value={nome} onChange={handleNome}/>
                <br/>
                <label>Quantidade</label>
                <input type="number" value={quantidade} onChange={handleQuantidade}/>
                <br/>
                <label>Preço</label>
                <input type="number" value={preco} onChange={handlePreco}/>
                <br/>
                <button type="button" onClick={handleCadastrarSorvete}>Cadastrar Sorvete</button>
            </form>
        </div>
    )
}

export default Sorvetes;