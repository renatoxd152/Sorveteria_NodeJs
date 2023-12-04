import React, { useState,useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
const SelectVendedores = () => {

    const[vendedores,setVendedores] = useState([]);
    const[vendedor,setVendedor]= useState("");
    const {token} = useAuth();
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
            console.error("Erro ao buscar os vendedores:", error);
          }
        };
    
        fetchData();
      }, [token]);


      const handleSelectChange = (event) => {
        const selectedVendedor = event.target.value;
        setVendedor(selectedVendedor);
      };


  return (
    <select value={vendedor} onChange={handleSelectChange}>
      <option value="">Selecione um vendedor</option>
      {vendedores.map((vendedor) => (
        <option key={vendedor.id} value={vendedor.id}>
          {vendedor.nome}
        </option>
      ))}
    </select>
  );
};

export default SelectVendedores;
