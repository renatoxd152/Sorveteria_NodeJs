import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
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
    <div>
      <h1>Login</h1>
      <form>
        <span>{mensagem}</span>
        <br/>
        <label>CPF</label>
        <input type="text" value={email} onChange={handleEmailChange} />
        <br/>
        <label>Senha:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br/>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>Não tem uma conta? <Link to="/cadastrar">Cadastre-se aqui</Link></p>
  
    </div>
  );
};

export default Login;
