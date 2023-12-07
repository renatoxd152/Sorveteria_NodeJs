import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../utils/AuthContext";
const Listar = () => {
  const [sorvetes, setSorvetes] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const { token } = useAuth();
  const[erro,setErro] = useState("");

  const handleExcluirSorvete = async (sorveteId) => {
    try {
      const response = await fetch(`http://localhost:3000/sorvetes/${sorveteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        
        const updatedSorvetes = sorvetes.filter((sorvete) => sorvete.id !== sorveteId);
        setSorvetes(updatedSorvetes);
        setMensagem(data.mensagem);
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
      console.error('Erro ao excluir sorvete:', error);
      setMensagem('Erro ao excluir sorvete');
    }
  };

 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch('http://localhost:3000/sorvetes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        const data = await response.json();

        setSorvetes(data);
      } catch (error) {
        console.error("Erro ao buscar sorvetes:", error);
      }
    }

    fetchData();
  }, [token]);


  return (
    <div>
      <h1>Lista de Sorvetes</h1>
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
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Excluir Sorvete</th>
            <th>Atualizar Sorvete</th>
          </tr>
        </thead>
        <tbody>
          {sorvetes.map((sorvete) => (
            <tr key={sorvete.id}>
              <td>{sorvete.nome}</td>
              <td>{sorvete.quantidade}</td>
              <td>{sorvete.preco}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleExcluirSorvete(sorvete.id)}>
                  Excluir
                </button>
              </td>
              <td>
                <Link to={`/editarSorvete/${sorvete.id}`} className="btn btn-primary">
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
