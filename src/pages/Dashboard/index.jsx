import { useContext } from 'react'
import {toast}  from 'react-toastify'
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';


export default function Dashboard() {

    const { signOut } = useContext(AuthContext);

    function mensagemBemVindo(){
        toast.success("Bem vindo de volta!");
    }
    





    return (
        <div>
            {mensagemBemVindo()}
            <Header></Header>
            Dashboard <h2>LOGADO</h2>
            <button onClick={() => signOut()}> Fazer logout </button>







        </div >
    )
}