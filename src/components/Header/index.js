import './header.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import { FiHome, FiUser, FiSettings } from "react-icons/fi";


import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export default function Header() {

    const { user } = useContext(AuthContext);
    const { signOut } = useContext(AuthContext);
    


    return (

        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto avatar" />
            </div>
            
            <Link to="/dashboard"> <FiHome color='#FFF' size={24}/>Chamados </Link>
            <Link to="/customers"> <FiUser color='#FFF' size={24}/>Clientes </Link>
            <Link to="/profilesettings"> <FiSettings color='#FFF' size={24}/>Configurações </Link>
            <button onClick={() => signOut()}> Fazer logout </button>
           


        </div>
    )


}