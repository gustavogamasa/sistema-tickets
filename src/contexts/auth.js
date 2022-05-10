
import { useState, useEffect, createContext, useSyncExternalStore } from 'react';
import SignUp from '../pages/SignUp';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [user, setUser] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        function loadStorage() {

            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);

        }

        loadStorage();

    }, []); //useEffect



    //LOGIN DE USUARIO
    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {

                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data.nome,
                    email: userProfile.data.email,
                    avatarUrl: value.user.email
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);

                alert("Login efetuado com sucesso");


            })
            .catch((e) => {
                console.log(e);
                setLoadingAuth(false);
            });


    }


    //CADASTRAR USUARIO
    async function signUpRegister(email, password, nome) {

        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {

                let uid = value.user.uid;

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        avatarUrl: null,

                    }).then(() => {

                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null
                        };

                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);

                    });


            }).catch((error) => {
                console.log(error);
                setLoadingAuth(false);
            });

    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    //LOGOUT

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
        alert(`Saindo do sistema com segurança`);
    }

    //LOGOUT




    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUpRegister, signOut, signIn, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )

}  // ------ AuthProvider

export default AuthProvider;