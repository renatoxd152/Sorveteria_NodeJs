import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import Barra from "../../utils/Sorvete/barra_navegacao";


const Compras = () => {
  
  const [sorvetes, setSorvetes] = useState([]);
  const [sorveteSelecionado, setSorveteSelecionado] = useState([]);
  const {token} = useAuth();
  const[vendedores,setVendedores] = useState([]);
  const[vendedor,setVendedor]= useState("");
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState("");
  const [quantidades, setQuantidades] = useState({});
  const[mensagem,setMensagem] = useState("");
  const[sorveteAtualizado,setSorveteAtualizado] = useState("");

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
        setMensagem("Erro ao buscar os clientes:", error);
      }
    };

    fetchData();
  }, [token]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/vendedor", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });

        const data = await response.json();
       
        setVendedores(data);
      } catch (error) {
        setMensagem("Erro ao buscar os vendedores:", error)
        
      }
    };

    fetchData();
  }, [token]);



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
        setMensagem("Erro ao buscar sorvetes:", error)
      
      }
    };

    fetchData();
  }, [token]);






  const handleSelectClienteChange = (event) => {
    const selectedCliente = event.target.value;
    setCliente(selectedCliente);
  };

  const handleSelectVendedorChange = (event) => {
    const selectedVendedor = event.target.value;
    setVendedor(selectedVendedor);
  };
   
  const handleSorveteChange = (sorvete) => {
    
    const updatedSorvetes = sorveteSelecionado.includes(sorvete)
      ? sorveteSelecionado.filter((s) => s !== sorvete)
      : [...sorveteSelecionado, sorvete];



    const updatedQuantidades = { ...quantidades };
    if (!updatedSorvetes.includes(sorvete)) {
      updatedQuantidades[sorvete] = 0;
    }


    setSorveteSelecionado(updatedSorvetes);
    setQuantidades(updatedQuantidades);
  };

  const cadastraCompra = async () => {
    try {

      for (const sorveteId of sorveteSelecionado) {
        const sorvete = sorvetes.find((s) => s.id === sorveteId);
        const quantidadeSelecionada = quantidades[sorveteId];
      
        if(quantidadeSelecionada <= 0)
        {
          setMensagem("Selecione uma quantidade maior que 0");
          return;
        }
        if (sorvete && quantidadeSelecionada > sorvete.quantidade) {
          setMensagem(`Quantidade insuficiente de ${sorvete.nome} no estoque`);
          return;
        }
      }
      const requestBody = {
        id_vendedor: vendedor,
        id_cliente: cliente,
        valor_compra: calcularValorTotalSelecionados(),
        sorvetes: sorveteSelecionado.map((id_sorvete) => ({
          id_sorvete,
          quantidade: quantidades[id_sorvete],
        })),
      };
  

      for (const sorveteId of sorveteSelecionado) {
        await deletarQuantidades_Sorvetes(sorveteId,quantidades[sorveteId]);
      }
      
      
      const response = await fetch("http://localhost:3000/compras", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(requestBody),
      });

        const data = await response.json();
        console.log(data.mensagem);
        setMensagem(data.mensagem);
      
  
    } catch (error) {
      setMensagem("Erro ao cadastrar compra:", error);
    }
  };
  

  const handleQuantidadeChange = (sorveteId, quantidade) => {
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [sorveteId]: quantidade,
    }));
  };

  const calcularValorTotal = (sorveteId) => {
    const sorvete = sorvetes.find((s) => s.id === sorveteId);
    const quantidade = quantidades[sorveteId];
  
   
    if (quantidade == null || isNaN(quantidade)) {
      return 0;
    }
  
    return sorvete ? sorvete.preco * quantidade : 0;
  };

const calcularValorTotalSelecionados = () => {
  let totalSelecionados = 0;

  for (const sorveteId of sorveteSelecionado) {
    totalSelecionados += calcularValorTotal(sorveteId);
  }

  return totalSelecionados;
};







const deletarQuantidades_Sorvetes = async (id,quantidade) =>
{
  try {
    const response = await fetch(`http://localhost:3000/sorvetes/atualizarQuantidade/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ quantidade:quantidade}),
    });

    const data = await response.json();
    setSorveteAtualizado(data.mensagem);
  } catch (error) {
    console.error("Erro ao atualizar o sorvete:", error);
    setMensagem("Erro ao atualizar o sorvete!");
  }

}
  return (
    
    <div>
      <Barra />
      
      
      <form> 
      
          <select value={vendedor} onChange={handleSelectVendedorChange}>
        <option value="">Selecione um vendedor</option>
        {vendedores.map((vendedor) => (
          <option key={vendedor.id} value={vendedor.id}>
            {vendedor.nome}
          </option>
        ))}
      </select>


          <br />

          <select value={cliente} onChange={handleSelectClienteChange}>
      <option value="">Selecione um cliente</option>
      {clientes.map((cliente) => (
        <option key={cliente.id} value={cliente.id}>
          {cliente.nome}
        </option>
      ))}
    </select>
        
    <h3>Selecione os Sorvetes:</h3>
    <p>{mensagem}</p>
    <p>{sorveteAtualizado}</p>
      <table>
        <thead>
          <tr>
            <th>Selecionar</th>
            <th>Nome do Sorvete</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sorvetes.map((sorvete) => (
            <tr key={sorvete.id}>
              <td>
                <label>
                  <input
                    type="checkbox"
                    value={sorvete.id}
                    checked={sorveteSelecionado.includes(sorvete.id)}
                    onChange={() => handleSorveteChange(sorvete.id)}
                  />
                </label>
              </td>
              <td>{sorvete.nome}</td>
              <td>{sorvete.preco}</td>
              <td>
                {sorveteSelecionado.includes(sorvete.id) && (
                  <input
                    type="number"
                    min="1"
                    onChange={(e) =>
                      handleQuantidadeChange(sorvete.id, parseInt(e.target.value, 10))
                    }
                    
                  />
                )}
              </td>
              <td>{calcularValorTotal(sorvete.id)}</td>
              
            </tr>

            
  
          ))}
          <tr>
            <td colSpan="3"></td>
            <td>Total</td>
            <td>{calcularValorTotalSelecionados()}</td>
        </tr>
        </tbody>
      </table>
      <button type="button" onClick={cadastraCompra}>Cadastrar Compra</button>
      </form>
    </div>
  );
};

export default Compras;
