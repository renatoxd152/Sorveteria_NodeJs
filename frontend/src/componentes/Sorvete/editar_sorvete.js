import React,{useState} from "react";
import { useAuth } from "../../utils/AuthContext";
import { useParams,useNavigate } from 'react-router-dom';
import Barra from "../../utils/Sorvete/barra_navegacao";
const EditarSorvete = () =>
{ 
    const { id } = useParams();
    const[mensagem,setMensagem] = useState("");
    const[nome,setNome] = useState("");
    const[quantidade,setQuantidade] = useState("");
    const[preco,setPreco] = useState("");
    const{ token } = useAuth();
    const navigate = useNavigate();
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

    const handleEditarSorvete = async () => {
       
        try {
           
          const response = await fetch(`http://localhost:3000/sorvetes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
            },
            body: JSON.stringify({ nome:nome,quantidade:quantidade,preco:preco }),
          });
          
          const data = await response.json();
          
          navigate("/sorvetes/listar");

          setMensagem(data.mensagem);

          
        } catch (error) {
          console.error('Erro ao cadastrar o sorvete!'+ error);
        }
      };

      const voltar = () =>
      {
            navigate("/sorvetes/listar");
      }
    return(
        
        <div>
            <Barra/>
            <h1>Editar Sorvete</h1>
            <form className="container mt-4">
                <span>{mensagem}</span>
                <br/>
                <label>Nome do sorvete do sorvete</label>
                <input type="text" className="form-control" value={nome} onChange={handleNome}/>
                <br/>
                <label>Quantidade</label>
                <input type="number" className="form-control" value={quantidade} onChange={handleQuantidade}/>
                <br/>
                <label>Preço</label>
                <input type="number" className="form-control" value={preco} onChange={handlePreco}/>
                <br/>
                <button type="button" className="btn btn-secondary me-2" onClick={voltar}>Voltar</button>
                <button type="button" className="btn btn-primary" onClick={handleEditarSorvete}>Editar Sorvete</button>
            </form>
        </div>
    )
}

export default EditarSorvete;