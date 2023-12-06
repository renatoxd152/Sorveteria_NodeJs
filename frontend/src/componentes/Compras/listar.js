import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";

const Listar = () => {
    const { token } = useAuth();
    const [compras, setCompras] = useState([]);
    const [detalhesCompra, setDetalhesCompra] = useState(null);
    const[itens,setItens] = useState([]);
    const[mensagem,setMensagem] = useState("");

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
          <p>{mensagem}</p>
      <table>
        <thead>
          <tr>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Valor da Compra</th>
            <th>Data da Compra</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
             <tr key={compra.id} onClick={() => handleRowClick(compra.id)}>
              <td>{compra.nome_vendedor}</td>
              <td>{compra.nome_cliente}</td>
              <td>{compra.valor_compra}</td>
              <td>{compra.data_compra}</td>
              <td><button type="button" onClick={()=>excluirCompra(compra.id)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      
  <div>
    <h2>Detalhes da Compra</h2>
    <p><strong>Itens da Compra:</strong></p>
    <ul>
      {itens.map(item => (
        <li key={item.id}>{item.nome_sorvete} - Quantidade: {item.quantidade}</li>
      ))}
    </ul>
  </div>





      </div>
      
    );
  };
  
  export default Listar;
  