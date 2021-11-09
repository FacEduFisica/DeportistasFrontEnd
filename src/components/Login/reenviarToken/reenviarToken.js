import React, { useState } from 'react';
import axios from 'axios';
import { sweetAlert } from '../../actionsGlobals';

import './reenviarToken.css';
import { BASE_URL, SUCCESS, WARNING } from '../../../constantGlobal';

const ReenviarToken = ({ setModalToken }) => {
    // hook para capturar el correo del usuario
    const [correo , setCorreo] = useState("");

    // hook que captura el error en caso de no ingresar email
    const [errorEmail, setErrorEmail] = useState(false);

    // funcion para reenviar token de validacion
    const reenviarTokenValidacion = async () => {
        if(correo){
            try {
                const requestToken = {
                    email : correo
                }

                const response = await axios.get(`${BASE_URL}/confirmacion/reenviar-token`, requestToken);

                if(response.data.codigo === '0000'){
                    sweetAlert(SUCCESS, "¡Éxito!", "El link de verificación ha sido enviado exitosamente al correo.")
                    setCorreo('');
                    setModalToken(false);
                }else if (response.data.codigo === '0002'){
                    sweetAlert(
                        WARNING,
                        '¡Atención!',
                        'El correo al cual desea reenviar link de activación tiene un token activo.'
                    );
                }

            } catch (error) {
                console.log(error)
            }
        }else{
            setErrorEmail(true)
        }
    };

    return (
        <div className='container-reenviarToken'>
            <div className='container-form-reenvviarToken'>
                <div className='containe-title-close-Token'>
                    <span className='title-reenviarToken'>
                        Ingresa tu correo para enviarte un nuevo link de
                        validación
                    </span>
                    <button
                        className='button-closed-olvido'
                        onClick={() => setModalToken(false)}
                    >
                        <i className='x icon'></i>
                    </button>
                </div>
                <div className='container-input-ReenviarToken'>
                    <label htmlFor='' className='correoReenviar'>
                        Correo (<span className='isRequired'>*</span>)
                    </label>
                    <input
                        className='input-reenviarToken'
                        type='text'
                        onFocus={() => setErrorEmail(false)}
                        onChange={({ target: { value } }) => setCorreo(value)}
                    />
                    {errorEmail && (
                        <span className='message-alert-reenviar'>
                            El campo es obligatorio
                        </span>
                    )}
                </div>
                <div className="container-button-reenviar">
                    <button
                        className='button-reenvio-token'
                        onClick={() => reenviarTokenValidacion()}
                    >
                        ENVIAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReenviarToken;
