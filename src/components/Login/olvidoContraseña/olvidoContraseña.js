import React, { useState } from 'react';
import axios from 'axios';

import './olvidoContraseña.css';
import { BASE_URL } from '../../../constantGlobal';

const OlvidoContraseña = ({ setOlvidoContraseña }) => {
    // hook para capturar el correo
    const [email, setEmail] = useState('');
    // hook validacion del correo
    const [errorEmail, setErrorEmail] = useState(false);
    // hook notificacion condigo enviado al correo.
    const [sendCodigo, setSendCodigo] = useState(false);
    // hook notificacion fallo el servicio
    const [errorSendCodigo, setErrorSendCodigo] = useState(false);

    // reset values hooks en el focus
    const resetHooks = () => {
        setErrorEmail(false);
        setErrorSendCodigo(false);
        setSendCodigo(false);
    };

    // funcion para recuperar la contraseña (generar una nueva)
    const recoveryContraseña = async () => {
        if (email) {
            try {
                let request = {
                    email
                };
                const response = await axios.post(
                    `${BASE_URL}/autenticacion/olvido-clave`,
                    request
                );

                if (response.data.codigo === '0000') {
                    setSendCodigo(true);
                    setEmail('');
                } else {
                    setErrorSendCodigo(true);
                    setEmail('');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrorEmail(true);
        }
    };

    return (
        <div className='modal-olvido-contraseña'>
            <div className='form-olvido-contraseña'>
                <div className='container-buton-close'>
                    <span className='label-olvido-contraseña'>
                        Ingrese su correo (
                        <span className='obligatorio'>*</span>)
                    </span>
                    <button
                        className='button-closed-olvido'
                        onClick={() => setOlvidoContraseña(false)}
                    >
                        <i className='x icon'></i>
                    </button>
                </div>
                <div className='container-form-olvido'>
                    <div className='container-input-olvido'>
                        <input
                            type='text'
                            onFocus={() => resetHooks()}
                            className='input-email-olvido'
                            onChange={({ target: { value } }) =>
                                setEmail(value)
                            }
                            placeholder='Correo electronico'
                            value={email}
                        />
                        {errorEmail && (
                            <span className='message-alert-olvido'>
                                El campo es obligatorio
                            </span>
                        )}
                    </div>
                    <button
                        className='button-olvido-contraseña'
                        onClick={() => recoveryContraseña()}
                    >
                        RECUPERAR CONTRASEÑA
                    </button>
                    {sendCodigo && (
                        <span className='message-success-olvido'>
                            Se ha enviado un link al correo para restablecer la
                            contraseña.
                        </span>
                    )}
                    {errorSendCodigo && (
                        <span className='message-error-olvido'>
                            Ha ocurrido un error con el servicio intentelo de
                            nuevo.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OlvidoContraseña;
