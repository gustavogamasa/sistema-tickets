
import { useState, useEffect, createContext } from 'react';
import SignUp from '../pages/SignUp';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
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

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUpRegister, signOut }}>
            {children}
        </AuthContext.Provider>
    )

}  // ------ AuthProvider

export default AuthProvider;