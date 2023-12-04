import React, { useState,useEffect } from "react";
import Barra from "../../utils/Sorvete/barra_navegacao";
import SelectVendedores from "../Vendedores/select_vendedores";
import SelectClientes from "../Clientes/select_clientes";
import { useAuth } from "../../utils/AuthContext";


const SelectSorvetes = () => {
  // Suponhamos que você tenha uma lista de sorvetes
  const [sorvetes, setSorvetes] = useState([]);
  const [sorveteSelecionado, setSorveteSelecionado] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const {token} = useAuth();

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
    };

    fetchData();
  }, [token]);




  const handleSorveteChange = (sorvete) => {
    // Adiciona ou remove o sorvete da lista de selecionados
    const updatedSorvetes = sorveteSelecionado.includes(sorvete)
      ? sorveteSelecionado.filter((s) => s !== sorvete)
      : [...sorveteSelecionado, sorvete];

    setSorveteSelecionado(updatedSorvetes);
  };

  const handleQuantidadeChange = (sorvete, quantidade) => {
    // Atualiza a quantidade para o sorvete selecionado
    setQuantidades({ ...quantidades, [sorvete]: quantidade });
  };
  
 


  return (
    <div>
      <h3>Selecione os Sorvetes:</h3>
      {sorvetes.map((sorvete) => (
        <div key={sorvete.id}>
          <label>
            <input
              type="checkbox"
              value={sorvete.id}
              checked={sorveteSelecionado.includes(sorvete.id)}
              onChange={() => handleSorveteChange(sorvete.id)}
            />
            {sorvete}
          </label>
          {sorveteSelecionado.includes(sorvete) && (
            <input
              type="number"
              min="0"
              value={quantidades[sorvete] || 0}
              onChange={(e) =>
                handleQuantidadeChange(sorvete.id, parseInt(e.target.value, 10))
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Compras = () => {
  return (
    <>
      <Barra />
      <div>
        <form>
          <SelectVendedores />
          <br />
          <SelectClientes />
          <br />
          <SelectSorvetes />
        </form>
      </div>
    </>
  );
};

export default Compras;
