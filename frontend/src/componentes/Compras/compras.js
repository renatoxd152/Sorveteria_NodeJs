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
  const[erro,setErro] = useState("");
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
        setErro("Erro ao buscar os clientes:", error);
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
        setErro("Erro ao buscar os vendedores:", error)
        
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
        setErro("Erro ao buscar sorvetes:", error)
      
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
      return data.sorvetes;
    } catch (error) {
      console.error("Erro ao atualizar o sorvete:", error);
      setErro("Erro ao atualizar o sorvete!");
    }
  
  }











  const cadastraCompra = async () => {
    try {
      
      if(sorveteSelecionado.length === 0)
      {
        setErro("Selecione pelo menos um sorvete");
        return;
      }
    
      for (const sorveteId of sorveteSelecionado) {
        const sorvete = sorvetes.find((s) => s.id === sorveteId);
        const quantidadeSelecionada = quantidades[sorveteId];
        
        if(quantidadeSelecionada <= 0)
        {
          setErro("Selecione uma quantidade maior que 0");
          return;
        }
        if (sorvete && quantidadeSelecionada > sorvete.quantidade) {
          setErro(`Quantidade insuficiente de ${sorvete.nome} no estoque`);
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
        const resultado = await deletarQuantidades_Sorvetes(sorveteId,quantidades[sorveteId]);
        setSorvetes(resultado);
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
  
    } catch (error) {
      setErro("Erro ao cadastrar compra:" + error);
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
        <p>Selecione o vendedor</p>
        <select className="form-select mb-3" value={vendedor} onChange={handleSelectVendedorChange}>
          <option value=""></option>
          {vendedores.map((vendedor) => (
            <option key={vendedor.id} value={vendedor.id}>
              {vendedor.nome}
            </option>
          ))}
        </select>

        <p>Selecione um cliente</p>
        <select className="form-select mb-3" value={cliente} onChange={handleSelectClienteChange}>
          <option value=""></option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>

        <h3>Selecione os Sorvetes:</h3>
        
        <table className="table">
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
                      className="form-check-input"
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
                      className="form-control"
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
        <button type="button" className="btn btn-primary" onClick={cadastraCompra}>
          Cadastrar Compra
        </button>
      </form>
    </div>
  );
};

export default Compras;
