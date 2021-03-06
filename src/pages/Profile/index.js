import './profile.css';
import { useState, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection';

import { FiSettings, FiUpload } from 'react-icons/fi'

import { AuthContext, signOut } from '../../contexts/auth';

export default function Profile() {

    const { user, signOut, setUser, storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);




    function handleFile(e) {
        // console.log(e.target.files[0]);
        if (e.target.files[0]) {
            const image = e.target.files[0];
            if (image.type === 'image/jpeg' || image.type == "image/png") {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                alert('Envie uma imagem no formato JPEG ou PNG')
                return null;
            }
        }

    }

    async function handleUploadAvatar() {

        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
            .ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                console.log("Nova foto enviada com sucesso!");

                await firebase.storage().ref(`images/${currentUid}`)
                    .child(imageAvatar.name).getDownloadURL()
                    .then(async (url) => {

                        let urlFoto = url;

                        await firebase.firestore().collection('users')
                            .doc(user.uid)
                            .update({
                                avatarUrl: urlFoto,
                                nome: nome
                            })
                            .then(() => {
                                let data = {
                                    ...user,
                                    avatarUrl: urlFoto,
                                    nome: nome
                                };
                                setUser(data);
                                storageUser(data);
                            })

                    })

            })

    }





    async function handleSave(e) {
        e.preventDefault();

        if (imageAvatar === null && nome !== "") {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    nome: nome
                })
                .then(() => {
                    alert("Cadastro alterado com sucesso");
                    let data = {
                        ...user,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
        } else if (nome !== "" && imageAvatar !== null) {
            handleUploadAvatar();
        }
    }




    return (

        <div>
            <Header />
            <div className='content'>
                <Title name="Meu perfil"> <FiSettings size={25} /> </Title>


                <div className='container'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25}></FiUpload>
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile}></input><br />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt='Foto do perfil do usuario'></img>
                                :
                                <img src={avatarUrl} width="250" height="250" alt='Foto do perfil do usuario'></img>
                            }
                        </label>

                        <label> Nome </label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <label> Email </label>
                        <input type="text" value={email} disabled={true}></input>
                        <button type="submit" onClick={(e) => handleSave(e)}>Salvar</button>
                    </form>

                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={() => { signOut() }}>
                        Sair
                    </button>

                </div>





            </div>





        </div>
    )

}