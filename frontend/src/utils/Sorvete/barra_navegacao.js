import React from "react";
import { Link } from 'react-router-dom';

const Barra = () =>
{
    return (
        <div>
        <nav>
          <li>Sorvetes
          <ul>
            <li><Link to="/sorvetes">Cadastrar Sorvetes</Link></li>
            <li><Link to="/sorvetes/listar">Listar Sorvetes</Link></li>
          </ul>
          
          </li>
          <li>Vendedores
          <ul>
            <li><Link to="/vendedores/cadastrar">Cadastrar Vendedor</Link></li>
            <li><Link to="/vendedores/listarVendedores">Listar Vendedores</Link></li>
          </ul>
          </li>
          <li>Clientes
          <ul>
            <li><Link to="/clientes/cadastrar">Cadastrar Clientes</Link></li>
            <li><Link to="/clientes/listarClientes">Listar Clientes</Link></li>
          </ul>
          </li>
          <li>Compras
          <ul>
            <li><Link to="/compras/cadastrar">Cadastrar Compra</Link></li>
            <li><Link to="/compras/listarCompras">Listar Compras</Link></li>
          </ul>
          </li>
        </nav>
        </div>

        
      );
}

export default Barra;