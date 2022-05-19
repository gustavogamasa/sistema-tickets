import './profile.css';
import { useState, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'

import { FiSettings, FiUpload } from 'react-icons/fi'

import { AuthContext, signOut } from '../../contexts/auth';

export default function Profile() {

    const { user, signOut } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    function handleSave(e){
        e.preventDefault();
        console.log("Salvar")
    }


    return (

        <div>
            <Header />
            <div className='content'>
                <Title name="Meu perfil"> <FiSettings size={25} /> </Title>


                <div className='container'>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25}></FiUpload>
                            </span>
                            <input type="file" accept="image/*"></input><br />
                            {avatarUrl === null ? 
                            <img src={avatar} width="250" height="250" alt='Foto do perfil do usuario'></img>    
                            :
                            <img src={avatarUrl} width="250" height="250" alt='Foto do perfil do usuario'></img> 
                        }
                        </label>

                        <label> Nome </label>
                        <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)}></input>
                        <label> Email </label>
                        <input type="text" value={email} disabled={true}></input>
                        <button type="submit" onClick={(e)=>handleSave(e)}>Salvar</button>
                    </form>

                </div>

               <div className='container'>
                    <button className='logout-btn' onClick={()=>{signOut()}}>
                        Sair
                    </button>

               </div>





            </div>





        </div>
    )

}