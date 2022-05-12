import { toast } from 'react-toastify';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'

import logo from '../../assets/logo.png'




function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  const { signUpRegister, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (nome !== '' && email !== '' && password !== '') {
      try {
        signUpRegister(email, password, nome);
        alert(`Usuário ${nome} cadastrado com sucesso`);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert(`Informe os dados corretamente`);
    }


  }

  return (
    <div className='container-center'>
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="sistema-logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Criar conta</h1>
          <input type="text" placeholder='Seu nome' value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit"> {loadingAuth ? "Carregando" : 'Cadastrar'} </button>
        </form>

        <Link to='/'> Já possui uma conta? Clique aqui</Link>

      </div>
    </div>
  );
}

export default SignUp;