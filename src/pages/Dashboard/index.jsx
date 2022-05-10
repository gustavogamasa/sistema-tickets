import { useContext } from 'react'

import { AuthContext } from '../../contexts/auth'


export default function Dashboard() {

    const { signOut } = useContext(AuthContext);






    return (
        <div>

            <h1> DASHBOARD </h1> <h2>LOGADO</h2>
            <button onClick={() => signOut()}> Fazer logout </button>







        </div >
    )
}