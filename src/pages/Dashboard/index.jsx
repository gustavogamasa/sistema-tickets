import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns'

import Header from '../../components/Header';
import Title from '../../components/Title'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import './dashboard.css'

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard() {

    const { signOut } = useContext(AuthContext);
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDoc, setLastDoc] = useState();


    useEffect(() => {

        loadChamados();

        return () => {

        }

    }, []);



    async function loadChamados() {

        await listRef.limit(5)
            .get()
            .then((snapshot) => {
                updateState(snapshot)
            })
            .catch((error) => {
                console.log(error);
                setLoadingMore(false);
            })

        setLoading(false);

    }

 async function handleMore(){
       setLoadingMore(true);

       await listRef.startAfter(lastDoc).limit(5)
       .get()
       .then((snapshot)=>{

        updateState(snapshot);

       })


    }

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty) {

            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })
            const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //pega o ultimo chamado carregado

            setChamados(chamados => [...chamados, ...lista]);
            setLastDoc(lastDoc);

        } else {
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    //CARREGANDO
    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="Atendimentos">
                        <FiMessageSquare size={25}></FiMessageSquare>
                    </Title>

                    <div className='container dashboard'>
                        <span>Buscando chamados...
                        </span>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            </div>
        )
    }



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
                                {chamados.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label='Cliente'>{item.cliente}</td>
                                            <td data-label='Assunto'>{item.assunto}</td>
                                            <td data-label='Status'>
                                                <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                                            </td>
                                            <td data-label='Cadastrado'>{item.createdFormated}</td>
                                            <td data-label='#'>
                                                <button className='action' style={{ backgroundColor: "#3583f6" }}><FiSearch color='#FFF' size={17} /></button>
                                                <button className='action' style={{ backgroundColor: "#F6a935" }}><FiEdit2 color='#FFF' size={17} /></button>

                                            </td>
                                        </tr>)

                                })}


                            </tbody>
                        </table>
                        
                        {loadingMore &&  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}

                        {!loadingMore && !isEmpty &&
                            <button className='btn-more' onClick={handleMore}>Buscar mais</button>
                        }

                    </>
                )}

                {/* FIM SCRIPT */}






            </div>

        </div >
    )
}