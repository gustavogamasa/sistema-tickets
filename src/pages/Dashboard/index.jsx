import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
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

                    // IF SEM CONTEÚDO

                ) : (

                     // IF COM CONTEÚDO

                    <>
                        <Link to="/new" className='new'>
                            <FiPlus size={25} color="#FFF" /> Novo chamado
                        </Link>

                        {/* TABELA */}
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Assunto</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Cadastrado em</th>
                                    <th scope='col'>#</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td data-label='Cliente'>Sujeito</td>
                                    <td data-label='Assunto'>Suporte</td>
                                    <td data-label='Status'>
                                        <span className='badge' style={{ backgroundColor: "#5cb85c" }}>Em aberto</span>
                                    </td>
                                    <td data-label='Cadastrado'>20/06/2022</td>
                                    <td data-label='#'>
                                        <button className='action' style={{ backgroundColor: "#3583f6" }}><FiSearch color='#FFF' size={17} /></button>
                                        <button className='action' style={{ backgroundColor: "#F6a935" }}><FiEdit2 color='#FFF' size={17} /></button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </>
                )}

                {/* FIM SCRIPT */}






            </div>

        </div >
    )
}