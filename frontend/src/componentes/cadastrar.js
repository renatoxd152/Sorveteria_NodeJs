import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cadastrar = ()=>
{
    const navigate = useNavigate();
    const[cpf,setCPF] = useState('');
    const[senha,setSenha] = useState('');
    const[mensagem,setMensagem] = useState('');

    const handleCPFChange = (e) => {
        setCPF(e.target.value);
      };


    const handlePasswordChange = (e) =>
    {
        setSenha(e.target.value);
    }


    const handleCadastrar = async () => {
        try {
          if (!cpf || !senha) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
          }
          const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login:cpf,senha:senha }),
          });

          
          setCPF('');
          setSenha('');
          navigate("/login");
          
          
        } catch (error) {
          console.error('Erro ao fazer login', error);
        }
      };


      return (
        <div className="container mt-5">
          <h1>Faça o seu cadastro!</h1>
          <form>
          <div className={`alert ${mensagem ? 'alert-danger' : 'd-none'}`} role="alert">
          {mensagem}
        </div>
            <div className="form-group">
              <label>Digite o seu CPF</label>
              <input
                type="text"
                className="form-control"
                value={cpf}
                onChange={handleCPFChange}
              />
            </div>
            <div className="form-group">
              <label>Digite uma senha:</label>
              <input
                type="password"
                className="form-control"
                value={senha}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleCadastrar}
            >
              Cadastrar
            </button>
          </form>
          <p className="mt-3">
            <Link to="/login">Voltar</Link>
          </p>
        </div>
      );
}
export default Cadastrar;