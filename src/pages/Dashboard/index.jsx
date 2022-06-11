import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title'
import { FiMessageSquare, FiPlus } from 'react-icons/fi'
import './dashboard.css'


export default function Dashboard() {

    const { signOut } = useContext(AuthContext);
    const [chamados, setChamados] = useState([]);


    return (
        <div>

            <Header />
            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageSquare size={25}></FiMessageSquare>
                </Title>

                {chamados.length === 0 ? (<div className="container dashboard">

                    <span>Nenhum chamado registrado...</span>
                    <Link to="/new" className='new'>
                        <FiPlus size={25} color="#FFF" /> Novo chamado
                    </Link>

                </div>

                    //IF SEM CONTEÚDO

                ) : (

                    <>
                        <Link to="/new" className='new'>
                            <FiPlus size={25} color="#FFF" /> Novo chamado
                        </Link>
                    </>
                )}






            </div>

        </div >
    )
}