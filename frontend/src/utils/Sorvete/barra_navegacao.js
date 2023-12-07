import React, { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../AuthContext";

const Barra = () => {
  
  const [submenuAberto, setSubmenuAberto] = useState(null);
  const{logout} = useAuth();
  const navigate = useNavigate();
  const toggleSubmenu = (grupo) => {
    setSubmenuAberto((prevState) => (prevState === grupo ? null : grupo));
  };

  const handleClick = (grupo) => (e) => {
    e.preventDefault();
    toggleSubmenu(grupo);
  };

  const sair = () =>
  {
    logout();
    return navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="sorvetesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={submenuAberto === 'sorvetes'}
              onClick={handleClick('sorvetes')}
            >
              Sorvetes
            </a>
            <div
              className={`dropdown-menu ${submenuAberto === 'sorvetes' ? 'show' : ''}`}
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
              aria-expanded={submenuAberto === 'vendedores'}
              onClick={handleClick('vendedores')}
            >
              Vendedores
            </a>
            <div
              className={`dropdown-menu ${submenuAberto === 'vendedores' ? 'show' : ''}`}
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
              aria-expanded={submenuAberto === 'clientes'}
              onClick={handleClick('clientes')}
            >
              Clientes
            </a>
            <div
              className={`dropdown-menu ${submenuAberto === 'clientes' ? 'show' : ''}`}
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
              aria-expanded={submenuAberto === 'compras'}
              onClick={handleClick('compras')}
            >
              Compras
            </a>
            <div
              className={`dropdown-menu ${submenuAberto === 'compras' ? 'show' : ''}`}
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
        <button onClick={sair} className="btn btn-danger">Sair</button>
      </nav>
      
    </div>
  );
};

export default Barra;
