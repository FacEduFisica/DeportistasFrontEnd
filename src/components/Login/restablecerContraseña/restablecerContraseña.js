import React, { useState } from 'react';
import axios from 'axios';
import { sweetAlert } from '../../actionsGlobals';
import { MESSAGE_PCJIC, WARNING, BASE_URL, SUCCESS } from '../../../constantGlobal';
import { MESSAGE_FIELD_REQUARED_GENERIC } from '../../FormConstants/constants';
import './restablecerContraseña.css';
import { MESSAGE_NO_EQUALS, MESSAGE_NO_VALID_PASSWORD } from '../constants';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

const RestablecerContraseña = (props) => {
    // hook para capturar los valores de los input
    const [newEmail, setNewEmail] = useState({
        password: '',
        confirmarPassword: ''
    });

    // hook para validar que las contraseñas sean iguales
    const [validateContraseña, setValidetaContraseña] = useState(false);
    // hook validar longitud de la contraseña
    const [validateLength, setValidateLength] = useState(false)

    const saveNewPassword = async () => {       

        const values = Object.values(newEmail);
        const valuesValidate = values.filter(item => item !== '');

        if (valuesValidate.length === 2) {
            
            if ((newEmail.password !== newEmail.confirmarPassword)) {
                setValidetaContraseña(true);
            }else if(newEmail.password.length < 8 || newEmail.confirmarPassword.length <8){
                setValidateLength(true);
            }else{
                try {
                    const response = await axios.post(`${BASE_URL}/reset/${props.match.params.token}`, newEmail) 

                    if(response.data.codigo === '0000'){
                        sweetAlert(SUCCESS, "¡Éxito!" , "La contraseña ha sido restaurada exitosamente.")
                        //redirect
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            sweetAlert(WARNING, 'Atención', MESSAGE_FIELD_REQUARED_GENERIC);
        }
    };
    
        const [redirect, setRedirect] = useState("");
        const loginSession = () => {
            setRedirect("/");
        };
    

    return (
        <div className='container-restablecer-contraseña'>
            <h1 className='title-restablecer-contraseña'>
                Restablecer contraseña
            </h1>
            <div className='container-form-restablecer'>
                <div className='container-lbl-olvido'>
                    <label className='label-olvido' htmlFor=''>
                        Nueva contraseña (
                        <span className='required-olvido'>*</span>)
                    </label>
                    <input
                        className='input-olvido'
                        type='password'
                        required
                        onFocus={() => {
                            setValidetaContraseña(false);
                            setValidateLength(false);
                        }}
                        placeholder='nueva contraseña'
                        onChange={({ target: { value } }) =>
                            setNewEmail({
                                ...newEmail,
                                password: value
                            })
                        }
                    />
                </div>
                <div className='container-lbl-olvido'>
                    <label htmlFor='' className='label-olvido'>
                        Confirmar nueva contraseña (
                        <span className='required-olvido'>*</span>)
                    </label>
                    <input
                        className='input-olvido'
                        type='password'
                        required
                        onFocus={() => {
                            setValidetaContraseña(false);
                            setValidateLength(false);
                        }}
                        placeholder='Confirmar contraseña'
                        onChange={({ target: { value } }) =>
                            setNewEmail({
                                ...newEmail,
                                confirmarPassword: value
                            })
                        }
                    />
                </div>
                {validateLength && (
                    <span className='message-alert-restablecer'>
                        {MESSAGE_NO_VALID_PASSWORD}
                    </span>
                )}
                {validateContraseña && (
                    <span className='message-alert-restablecer'>
                        {MESSAGE_NO_EQUALS}
                    </span>
                )}
                <button
                    className='boton-guardar-nuevaPass'
                    onClick={() => saveNewPassword()}
                >
                    GUARDAR
                </button>
                <button
                    className='boton-login'
                    onClick={() => loginSession()}
                >
                    LOGIN
                </button>
                {redirect && <Redirect to={redirect} />}
            </div>
            {}
            <span className='footer-welcome-restablecer'>
                {MESSAGE_PCJIC} <span> &copy; </span> 2020
            </span>
        </div>
    );
};

export default withRouter(RestablecerContraseña);
