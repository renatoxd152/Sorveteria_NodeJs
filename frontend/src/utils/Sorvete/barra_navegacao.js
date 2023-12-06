import React, { useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Barra = () => {
  const [submenusVisiveis, setSubmenusVisiveis] = useState({});

  const toggleSubmenu = (grupo) => {
    setSubmenusVisiveis((prevState) => ({
      ...prevState,
      [grupo]: !prevState[grupo] || false,
    }));
  };

  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="sorvetesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={submenusVisiveis['sorvetes']}
              onClick={() => toggleSubmenu('sorvetes')}
            >
              Sorvetes
            </a>
            <div
              className={`dropdown-menu ${submenusVisiveis['sorvetes'] ? 'show' : ''}`}
              aria-labelledby="sorvetesDropdown"
            >
              <Link className="dropdown-item" to="/sorvetes">
                Cadastrar Sorvetes
              </Link>
              <Link className="dropdown-item" to="/sorvetes/listar">
                Listar Sorvetes
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="vendedoresDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={submenusVisiveis['vendedores']}
              onClick={() => toggleSubmenu('vendedores')}
            >
              Vendedores
            </a>
            <div
              className={`dropdown-menu ${submenusVisiveis['vendedores'] ? 'show' : ''}`}
              aria-labelledby="vendedoresDropdown"
            >
              <Link className="dropdown-item" to="/vendedores/cadastrar">
                Cadastrar Vendedor
              </Link>
              <Link className="dropdown-item" to="/vendedores/listarVendedores">
                Listar Vendedores
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="clientesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={submenusVisiveis['clientes']}
              onClick={() => toggleSubmenu('clientes')}
            >
              Clientes
            </a>
            <div
              className={`dropdown-menu ${submenusVisiveis['clientes'] ? 'show' : ''}`}
              aria-labelledby="clientesDropdown"
            >
              <Link className="dropdown-item" to="/clientes/cadastrar">
                Cadastrar Clientes
              </Link>
              <Link className="dropdown-item" to="/clientes/listarClientes">
                Listar Clientes
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="comprasDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={submenusVisiveis['compras']}
              onClick={() => toggleSubmenu('compras')}
            >
              Compras
            </a>
            <div
              className={`dropdown-menu ${submenusVisiveis['compras'] ? 'show' : ''}`}
              aria-labelledby="comprasDropdown"
            >
              <Link className="dropdown-item" to="/compras/cadastrar">
                Cadastrar Compra
              </Link>
              <Link className="dropdown-item" to="/compras/listarCompras">
                Listar Compras
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Barra;
