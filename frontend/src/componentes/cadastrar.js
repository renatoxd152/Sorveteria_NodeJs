import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Cadastrar = ()=>
{
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
          const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login:cpf,senha:senha }),
          });
      
          const data = await response.json();
      
          if (data.success) {
           
            console.log('Login bem-sucedido');
            setMensagem('Cadastro realizado com sucesso!');
            setCPF('');
            setSenha('');
          } else {
            setMensagem(data.message);
          }
        } catch (error) {
          console.error('Erro ao fazer login', error);
        }
      };


    return(
        <div>
            <h1>Faça o seu cadastro!</h1>
            <form>
            <span>{mensagem}</span>
            <br/>
            <label>Digite o seu CPF</label>
            <input type='text' value={cpf} onChange={handleCPFChange}></input>
            <br/>
            <label>Digite uma senha:</label>
            <input type="password" value={senha} onChange={handlePasswordChange} />
            <br/>
            <button type='button' onClick={handleCadastrar}>Cadastrar</button>
            </form>
            <p><Link to="/login">Voltar</Link></p>
        </div>
    );
}
export default Cadastrar;