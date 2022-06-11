import { useState } from 'react';
import './customers.css'
import Header from '../../components/Header';
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';

import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify'


export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [endereco, setEndereco] = useState("");

    async function handleAdd(e) {
        e.preventDefault();

        if (nomeFantasia !== '' && CNPJ !== '' && endereco !== '') {

            await firebase.firestore().collection('customers')
                .add({
                    nomeFantasia: nomeFantasia,
                    CNPJ: CNPJ,
                    endereco: endereco
                }).then(() => {
                    setNomeFantasia("");
                    setCNPJ("");
                    setEndereco("");
                    toast.info('Empresa cadastrada com sucesso!')
                }).catch((error)=>{
                    console.log(error);
                    toast.error('Erro ao cadastrar essa empresa');
                })


        } // IF - Not null 
        else {
            toast.error('Preencha todos os campos');
        }


    }





    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd}>
                        <label>Nome fantasia</label>
                        <input type="text" placeholder='Nome da empresa' value={nomeFantasia} onChange={(e) => { setNomeFantasia(e.target.value) }}></input>
                        <label>CNPJ</label>
                        <input type="text" placeholder='CNPJ' value={CNPJ} onChange={(e) => { setCNPJ(e.target.value) }}></input>
                        <label>Endereço</label>
                        <input type="text" placeholder='Endereço' value={endereco} onChange={(e) => { setEndereco(e.target.value) }}></input>
                        <button type='submit'> Cadastrar</button>
                    </form>
                </div>

            </div>

        </div>
    )

}