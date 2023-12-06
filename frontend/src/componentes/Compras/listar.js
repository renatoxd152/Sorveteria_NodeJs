import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import Modal from 'react-modal';
const Listar = () => {
    const { token } = useAuth();
    const [compras, setCompras] = useState([]);
    const [detalhesCompra, setDetalhesCompra] = useState(null);
    const[itens,setItens] = useState([]);
    const[mensagem,setMensagem] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setDetalhesCompra(null);
    };
    async function fetchDetalhesCompra(idCompra) {
        try {
          const response = await fetch(`http://localhost:3000/compra/${idCompra}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
    
          const data = await response.json();
          
          const itensComNomeSorvete = await Promise.all(
            data.map(async (item) => {
                const nomeSorvete = await fetchSorveteNome(item.id_sorvete);
                return {
                    ...item,
                    nome_sorvete: nomeSorvete,
                };
            })
        );

        setItens(itensComNomeSorvete);


        } catch (error) {
          console.error("Erro ao buscar detalhes da compra:", error);
          return null;
        }
      }
    
      const handleRowClick = async (idCompra) => {
        openModal();
        const detalhes = await fetchDetalhesCompra(idCompra);
        setDetalhesCompra(detalhes);
      };


    async function fetchVendedorNome(id) {
        try {
          const response = await fetch(`http://localhost:3000/vendedor/nome/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
      
          const data = await response.json();
          return data.nome;
        } catch (error) {
          console.error("Erro ao buscar o nome do vendedor:", error);
          return null;
        }
      }

      

      async function fetchClienteNome(id) {
        try {
          const response = await fetch(`http://localhost:3000/cliente/nome/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
      
          const data = await response.json();
          return data.nome;
        } catch (error) {
          console.error("Erro ao buscar o nome do Cliente:", error);
          return null;
        }
      }



      async function fetchSorveteNome(id) {
        try {
          const response = await fetch(`http://localhost:3000/sorvete/nome/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
      
          const data = await response.json();
          return data.nome;
        } catch (error) {
          console.error("Erro ao buscar o nome do Sorvete:", error);
          return null;
        }
      }


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/compras", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
  
          const data = await response.json();
          
  
          const comprasFormatadas = await Promise.all(
            data.map(async (compra) => {
              const nomeVendedor = await fetchVendedorNome(compra.id_vendedor);
              const nomeCliente = await fetchClienteNome(compra.id_cliente);
              return {
                ...compra,
                data_compra: new Date(compra.data_compra).toLocaleDateString(),
                nome_vendedor: nomeVendedor,
                nome_cliente: nomeCliente
              };
            })
          );
  
          setCompras(comprasFormatadas);
        } catch (error) {
          console.error("Erro ao buscar os clientes:", error);
        }
      };
  
      fetchData();
    }, [token]);


    const excluirCompra = async(id) =>
    {
      try {
        const response = await fetch(`http://localhost:3000/compras/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          const updatedCompras = compras.filter((compra) => compra.id !== id);
          setCompras(updatedCompras);
          setMensagem(data.mensagem);


         
        } else {
          setMensagem(data.mensagem);
        }
      } catch (error) {
        console.error("Erro ao excluir a compra:", error);
        setMensagem("Erro ao excluir a compra");
      }
    }










  
    return (
      <div>
         <div className={`alert ${mensagem ? 'alert-success' : 'd-none'}`} role="alert">
          {mensagem}
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Vendedor</th>
              <th>Cliente</th>
              <th>Valor da Compra</th>
              <th>Data da Compra</th>
              <th>Excluir Compra</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id}>
                <td onClick={() => handleRowClick(compra.id)} style={{cursor:'pointer'}}>{compra.nome_vendedor}</td>
                <td onClick={() => handleRowClick(compra.id)} style={{cursor:'pointer'}}>{compra.nome_cliente}</td>
                <td onClick={() => handleRowClick(compra.id)} style={{cursor:'pointer'}}>{compra.valor_compra}</td>
                <td onClick={() => handleRowClick(compra.id)} style={{cursor:'pointer'}}>{compra.data_compra}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => excluirCompra(compra.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Detalhes da Compra"
  className="modal-content" 
>
  <div className="modal-header">
    <h2 className="modal-title">Detalhes da Compra</h2>
    <button type="button" className="btn btn-secondary" onClick={closeModal}>
      Fechar
    </button>
  </div>
  <div className="modal-body">
    <p>
      <strong>Itens da Compra:</strong>
    </p>
    <ul className="list-group">
      {itens.map((item) => (
        <li key={item.id} className="list-group-item">
          {item.nome_sorvete} - Quantidade: {item.quantidade}
        </li>
      ))}
    </ul>
  </div>
  <div className="modal-footer">
    
  </div>
</Modal>

      </div>
    );
  };
  
  export default Listar;
  