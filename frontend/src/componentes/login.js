import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login:email,senha:password }),
      });
  
      const data = await response.json();
      if (data.token) {
        login(data.token);
        navigate('/sorvetes');
        setEmail('');
        setPassword('');
      } else {
        setMensagem("Erro ao fazer login!");
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };


  return (
    <div className="container mt-5">
      <h1 className="mb-4">Login</h1>
      <form>
      <div className={`alert ${mensagem ? 'alert-danger' : 'd-none'}`} role="alert">
          {mensagem}
        </div>
        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <p className="mt-3">
        Não tem uma conta? <Link to="/cadastrar">Cadastre-se aqui</Link>
      </p>
    </div>
  );

};

export default Login;
