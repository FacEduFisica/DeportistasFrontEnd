import React, { useState } from 'react';
import axios from 'axios';
import {
    MESSAGE_NO_FOUND,
    MESSAGE_NO_VALID_PASSWORD,
    MESSAGE_NO_CONFIRMED_EMAIL,
    MESSAGE_DISABLED_USER,
    MESSAGE_WRONG_DATA,
    MESSAGE_NO_FOUND_API
} from './constants';
import { BASE_URL, SRC_BASE } from '../../constantGlobal';
import Loading from '../common/loader';
import ReenviarToken from './reenviarToken/reenviarToken';
import OlvidoContraseña from './olvidoContraseña/olvidoContraseña';
import { Redirect } from 'react-router-dom';
import './styleLogin.css';

const FormLogin = () => {
    // hooks para capturar los valores del login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // hooks para setear los errores - validaciones
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    // hooks para setear los mensajes segun sea la validacion
    const [messageErrorEmail, setMessageErrorEmail] = useState('');
    const [messageErrorPassword, setMessageErrorPassword] = useState('');
    // hooks para capturas los datos de la peticion del login
    const [noRegister, setNoregister] = useState(false);
    //loader
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState('');
    // hook para cuando se olvido la contraseña
    const [olvidoContraseña, setOlvidoContraseña] = useState(false);
    // hook para el reenvio del token - para activar cuenta
    const [modalToken, setModalToken] = useState(false);

    const submitLogin = async () => {
        if (!email && !password) {
            setErrorEmail(true);
            setErrorPassword(true);
            setMessageErrorEmail(MESSAGE_NO_FOUND);
            setMessageErrorPassword(MESSAGE_NO_FOUND);
        } else if (!email) {
            setErrorEmail(true);
            setMessageErrorEmail(MESSAGE_NO_FOUND);
        } else if (!password) {
            setErrorPassword(true);
            setMessageErrorPassword(MESSAGE_NO_FOUND);
        } else if (password.length < 8) {
            setErrorPassword(true);
            setMessageErrorPassword(MESSAGE_NO_VALID_PASSWORD);
        } else {
            setLoading(true);
            const user = {
                email,
                password
            };
            try {
                const response = await axios.post(
                    `${BASE_URL}/autenticacion/autenticarse`,
                    user
                );
                const { codigo, estado, token, usuario } = response.data;
                if (estado) {
                    switch (codigo) {
                        case '0000':
                            // acá se setea toda la info del usuario
                            if (usuario.foto !== 'SIN-ESTABLECER') {
                                let src = SRC_BASE + usuario.foto;
                                localStorage.setItem('userImg', src);
                            }
                            localStorage.setItem('userToken', token);
                            setRedirect('/home');
                            // handleRedirectUserByRole(usuario);
                            break;
                        case '0003':
                            setNoregister(MESSAGE_NO_CONFIRMED_EMAIL);
                            break;
                        case '0004':
                            setNoregister(MESSAGE_DISABLED_USER);
                            break;
                        case '0005':
                            setNoregister(MESSAGE_WRONG_DATA);
                            break;

                        default:
                            console.log(
                                'the code does not correspond to the options'
                            );
                            break;
                    }
                } else {
                    switch (codigo) {
                        case '0002':
                            setNoregister(MESSAGE_WRONG_DATA);
                            break;
                        case '0003':
                            setNoregister(MESSAGE_NO_CONFIRMED_EMAIL);
                            break;
                        case '0005':
                            setNoregister(MESSAGE_WRONG_DATA);

                            break;

                        default:
                            console.log(
                                'the code does not correspond to the options'
                            );
                            break;
                    }
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setNoregister(MESSAGE_NO_FOUND_API);
                console.log(
                    'there was an error trying to do the request to the server ',
                    error
                );
            }
        }
    };

    return (
        <div className='container-body-form'>
            {/* el titulo depende del link donde este 
          al igual que el boton. personaliar lo inputs */}
            <div className='container-form'>
                <div className='input-box'>
                    <input
                        type='email'
                        name='name'
                        required
                        onChange={({ target: { value } }) => setEmail(value)}
                        onFocus={() => setErrorEmail(false)}
                        onClick={() => setNoregister('')}
                    />
                    {errorEmail && (
                        <span className='message-alert'>
                            {messageErrorEmail}
                        </span>
                    )}
                    <label>Ingrese su correo</label>
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        name='name'
                        required
                        onChange={({ target: { value } }) => setPassword(value)}
                        onFocus={() => setErrorPassword(false)}
                        onClick={() => setNoregister('')}
                    />
                    {errorPassword && (
                        <span className='message-alert'>
                            {messageErrorPassword}
                        </span>
                    )}
                    <label>Ingrese su contraseña</label>
                </div>
                {loading ? (
                    <button className='button-submit'>
                        {loading && <Loading />}
                    </button>
                ) : (
                    <button
                        className='button-submit'
                        onClick={() => submitLogin()}
                    >
                        INICIAR SESIÓN
                    </button>
                )}

                {olvidoContraseña && (
                    <OlvidoContraseña
                        setOlvidoContraseña={setOlvidoContraseña}
                    />
                )}
                <div className='container-olvido-contraseña'>
                    <span
                        className='olvido-contraseña'
                        onClick={() => setOlvidoContraseña(true)}
                    >
                        ¿Has olvidado tu contraseña?
                    </span>
                </div>
                {modalToken && <ReenviarToken setModalToken={setModalToken} />}
                {noRegister && (
                    <div>
                        <span className='message-alert'>{noRegister}</span>
                    </div>
                )}
                <div className='conainer-reenviar-token'>
                    <span className='message-reenviar-token'>
                        ¿Aún no has verificado tu cuenta? haz clic
                        <span
                            className='reenviar-aquiToken'
                            onClick={() => setModalToken(true)}
                        >
                            aquí
                        </span>
                    </span>
                </div>
            </div>
            {redirect && <Redirect to={redirect} />}
        </div>
    );
};

export default FormLogin;
