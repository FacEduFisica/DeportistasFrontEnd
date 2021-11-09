import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './formRegister.scss';
import { ROLELIST } from '../../FormConstants/constants';
import axios from 'axios';
import { sweetAlert } from '../../actionsGlobals';
import { ERROR, SUCCESS, BASE_URL } from '../../../constantGlobal';
import {
    MESSAGE_NO_VALID_PASSWORD,
    MESSAGE_NO_EQUALS
} from '../../Login/constants';
import authService from '../../../services/authService';

const FormRegister = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errors, setErrors] = useState({});
    const handleSendUser = e => {
        e.preventDefault();
        if (!!name && !!role && !!email && !!password && !!confirmPass) {
            if (
                password.length >= 8 &&
                password.length <= 12 &&
                password === confirmPass
            ) {
                const token = authService.getToken();
                const body = {
                    nombre: name,
                    email,
                    password,
                    role
                };
                
                axios
                    .post(
                        `${BASE_URL}/admin/users/crearusuario?token=${token}`,
                        body
                    )
                    .then(response => {
                        
                        if (
                            response.data.estado &&
                            response.data.codigo === '0000'
                        ) {
                            sweetAlert(
                                SUCCESS,
                                '¡Éxito!',
                                'Usuario creado exitosamente'
                            );
                        } else {
                            switch (response.data.codigo) {
                                case '0009':
                                    sweetAlert(
                                        ERROR,
                                        '¡Error!',
                                        'El correo ingresado ya se encuentra registrado.'
                                    );
                                    break;
                                default:
                                    sweetAlert(
                                        ERROR,
                                        '¡Error!',
                                        'Ha ocurrido un error creando el usuario, intente de nuevo.'
                                    );
                                    break;
                            }
                        }
                        setName('');
                        setRole('');
                        setEmail('');
                        setPassword('');
                        setConfirmPass('');
                    })
                    .catch(error =>
                        console.log('hubo un error creando el usuario', error)
                    );
                // sweetAlert(SUCCESS, 'Exito!', 'cumple los requisitos.');
            } else {
                if (password.length < 8 || password.length > 12) {
                    setErrors({ ...errors, size: MESSAGE_NO_VALID_PASSWORD });
                    return;
                }
                if (password !== confirmPass) {
                    setErrors({ ...errors, equal: MESSAGE_NO_EQUALS });
                }
            }
        } else {
            sweetAlert(ERROR, '¡Alerta!', 'Todos los campos son requeridos.');
        }
    };

    const validatePassOnBlur = () => {
        if (!confirmPass) return;
        if (password !== confirmPass) {
            setErrors({ ...errors, equal: MESSAGE_NO_EQUALS });
        }
    };
    return (
        <div className='user-register-container'>
            <h1>Registro de usuarios</h1>
            <form
                className='user-register-form_container'
                onSubmit={e => handleSendUser(e)}
            >
                <div className='user-register-form'>
                    <div className='form_item'>
                        <label htmlFor=''>Nombre</label>
                        <input
                            value={name}
                            type='text'
                            placeholder="Nombre"
                            className='input-form'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='form_item'>
                        <label htmlFor=''>Rol</label>
                        <Dropdown
                            value={role}
                            onChange={(e, { value }) => setRole(value)}
                            options={ROLELIST}
                            placeholder={'Seleccione...'}
                            selectOnBlur={false}
                            selection
                            className='input-dropdown'
                        />
                    </div>
                    <div className='form_item'>
                        <label htmlFor=''>Correo</label>
                        <input
                            value={email}
                            type='email'
                            placeholder="Correo"
                            onChange={e => setEmail(e.target.value)}
                            className='input-form'
                        />
                    </div>
                    <div className='form_item pass-container'>
                        <label htmlFor=''>Contraseña</label>
                        <div>
                            <input
                                value={password}
                                type='password'
                                placeholder="Contraseña"
                                onChange={e => {
                                    setPassword(e.target.value);
                                    setErrors({});
                                }}
                                className='input-form'
                            />
                            {errors.size && (
                                <span className='error-pass'>
                                    {errors.size}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='form_item pass-container'>
                        <label htmlFor=''>Confirmar contraseña</label>
                        <div>
                            <input
                                value={confirmPass}
                                type='password'
                                placeholder="Confirmar contraseña"
                                onChange={e => {
                                    setConfirmPass(e.target.value);
                                    setErrors({});
                                }}
                                className='input-form'
                                onBlur={() => validatePassOnBlur()}
                            />
                            {errors.equal && (
                                <span className='error-pass'>
                                    {errors.equal}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className='user-register-form_actions'>
                    <button className='buttons-save-edit' type='submit'>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormRegister;
