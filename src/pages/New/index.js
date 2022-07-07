import './new.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';




export default function New() {

    const [loadingCustomers, setLoadingCustomers] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [customers, setCustomers] = useState([]);

    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Aberto");
    const [complemento, setComplemento] = useState("");

    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {

                    let lista = [];
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })

                    if (lista.length === 0) {
                        console.log("Nenhuma empresa encontrada");
                        setCustomers([{ id: '1', nomeFantasia: 'Freelancer' }]);
                        setLoadingCustomers(false);
                        return;
                    }

                    setCustomers(lista);
                    setLoadingCustomers(false);

                })
                .catch((error) => { console.log("DEU ERRO", error); setLoadingCustomers(false); setCustomers([{ id: '1', nomeFantasia: '' }]); })
        }

        loadCustomers();

    }, []);


    //SALVAR NOVO CHAMADO   
    async function handleRegister(e) {
        e.preventDefault();

        await firebase.firestore().collection('chamados')
            .add({
                created: new Date(),
                cliente: customers[customerSelected].nomeFantasia,
                clienteID: customers[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            }).then(() => {
                toast.success('Chamado criado com sucesso');
                setComplemento('');
                setCustomerSelected(0);

            })
            .catch((error) => {
                console.log(error);
                toast.error("Ops! Erro ao cadastrar");
            })



    }

    //chamado quando troca o assunto
    function handleChangeSelect(e) {
        e.preventDefault();
        setAssunto(e.target.value);
    }

    //chamado quando troca o status
    function handleOptionChange(e) {
        e.preventDefault();
        setStatus(e.target.value);
    }

    //chamado quando troca cliente
    function handleChangeCustomers(e) {
        e.preventDefault();
      
        setCustomerSelected(e.target.value);


    }





    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Novo chamado"> <FiPlusCircle size={25} /> </Title>


                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>

                        <label>Cliente</label>

                        {loadingCustomers ? (
                            <input type="text" disabled={true} value="Carregando..."></input>
                        ) : (

                            <select value={customerSelected} onChange={handleChangeCustomers}>

                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}

                            </select>

                        )

                        }



                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Fnanceiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>

                            <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={status === "Aberto"}></input>
                            <span>Em Aberto</span>

                            <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} checked={status === "Progresso"}></input>
                            <span>Progresso</span>

                            <input type="radio" name="radio" value="Atendido" onChange={handleOptionChange} checked={status === "Atendido"}></input>
                            <span>Atendido</span>

                        </div>

                        <label>Complemento</label>
                        <textarea type="text" placeholder='Descreva seu problema (opcional)' value={complemento} onChange={(e) => setComplemento(e.target.value)}>
                        </textarea>




                        <button type='submit'>Registrar</button>

                    </form>
                </div>



            </div>


        </div>

    )
}