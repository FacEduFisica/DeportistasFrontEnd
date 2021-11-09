import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tooltip from '../common/tooltip';
import authService from '../../services/authService';
import { sweetAlert } from '../actionsGlobals';
import { Dropdown } from 'semantic-ui-react';
import { BASE_URL, WARNING, ERROR, SUCCESS } from '../../constantGlobal';
import {
    GENEROS_VALIDOS,
    MESSAGE_FORM_SAVED,
    MESSAGE_SUCCESS_FORM_EDIT
} from '../FormConstants/constants';

const OBJECT_SCHEMA = {
    key: '',
    text: '',
    value: ''
};

const MiDisciplina = () => {
    // hook para deshabilitar los campos del form luego de guardarlo
    const [noEdit, setNoEdit] = useState(false);

    // hook encargado de guardar la respuesta de la peticion
    const [isEditable, setIsEditable] = useState(false);

    // hook que guardara las opciones de las disciplinas deportivas
    const [disciplinas, setDisciplinas] = useState([]);

    // hook para capturar el genero y la disciplina que dicta el entrenador
    const [requestDisciplina, setRequestDisciplina] = useState({
        nombreDisciplina: '',
        generoDisciplina: ''
    });

    // useEffect para obtener las disciplinas y mostrarselas al entrenador
    useEffect(() => {
        let token = authService.getToken();
        let id = authService.getUserId();

        axios
            .get(
                `${BASE_URL}/admin/users/cambiodedatos/consultar?token=${token}`
            )
            .then(response => {
                const {
                    data: { codigo, puedeModificar }
                } = response;
                if (codigo === '0000') {
                    if (puedeModificar[0].estado === true) {
                        setIsEditable(true);
                    }
                }
            })
            .catch(error => console.log(error));

        axios
            .get(
                `${BASE_URL}/entrenador/obtenerdisciplina/${id}?token=${token}`
            )
            .then(response => {
                if (response.data.codigo === '0000') {
                    if (isEditable) {
                        setNoEdit(false);
                    } else {
                        setNoEdit(true);
                    }
                    setRequestDisciplina(
                        Object.assign({}, requestDisciplina, {
                            nombreDisciplina: response.data.nombreDisciplina,
                            generoDisciplina: response.data.generoDisciplina
                        })
                    );
                }
            });

        axios
            .get(
                `${BASE_URL}/admin/disciplinas/obtenerdisciplinas?token=${token}`
            )
            .then(response => {
                if (response.data.codigo === '0000') {
                    const newDisciplinas = response.data.disciplinas.map(item =>
                        Object.assign({}, OBJECT_SCHEMA, {
                            key: item._id,
                            text: item.nombre,
                            value: item.nombre
                        })
                    );
                    setDisciplinas(newDisciplinas);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // funcion para guardar la disciplina del entrenador
    const saveDisciplinaEntrenador = async () => {
        const values = Object.values(requestDisciplina);
        const validateValues = values.filter(item => item !== '');

        if (noEdit) {
            sweetAlert(WARNING, 'Atención', MESSAGE_FORM_SAVED);
        } else {
            if (validateValues.length === 2) {
                let token = authService.getToken();
                let id = authService.getUserId();

                if (isEditable) {
                    try {
                        const response = await axios.put(
                            `${BASE_URL}/entrenador/actualizardisciplina/${id}?token=${token}`,
                            requestDisciplina
                        );

                        if (response.data.codigo === '0000') {
                            sweetAlert(
                                SUCCESS,
                                '¡Éxito!',
                                MESSAGE_SUCCESS_FORM_EDIT
                            );
                            setNoEdit(true);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                        const response = await axios.post(
                            `${BASE_URL}/entrenador/registrardisciplina/${id}?token=${token}`,
                            requestDisciplina
                        );

                        if (response.data.codigo === '0000') {
                            sweetAlert(
                                SUCCESS,
                                '¡Éxito!',
                                'Se ha registrado exitosamente su disciplina deportiva.'
                            );
                            setNoEdit(true);
                        } else if (response.data.codigo === '0009') {
                            sweetAlert(
                                ERROR,
                                'Error',
                                'El entrenador ya tiene una disciplina registrada, debe editar para cambiarla..'
                            );
                        } else {
                            sweetAlert(
                                ERROR,
                                'Error',
                                'Ha ocurrido un error con el servidor, intentelo de nuevo.'
                            );
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                sweetAlert(
                    WARNING,
                    'Atención',
                    'Ambos campos son obligatorios para registrar su disciplina, diligencielos porfavor!'
                );
            }
        }
    };

    // funcion para editar la disciplina del entrenador
    const editDisciplinaEntrenador = () => {
         if (noEdit) {
             if (isEditable) {
                 setNoEdit(false);
                 sweetAlert(
                     SUCCESS,
                     '¡Éxito!',
                     'Puede proceder a editar su formulario acádemico y guardarlo, asegurese de diligenciar el formulario de manera correcta.'
                 );
             } else {
                 sweetAlert(WARNING, 'Atención', 'Para poder editar su disciplina deportiva debe comunicarse con el administrador para que le de permisos de edición.');
             }
         } else {
             sweetAlert(
                 WARNING,
                 'Atención',
                 'Puede diligenciar el formulario y guardar.'
             );
         }
    }

    return (
        <div className='container-form-sgdar'>
            <h1 className='title-form' style={{marginTop : 25, fontSize : 40}}>Mi disciplina deportiva</h1>
            <div
                className='form-sgdar'
                style={{ marginBottom: 100, height: 350, width: 700 }}
            >
                <div className='container-row-form'>
                    <div className='container-input'>
                        <div className='container-label' style={{width : 300}}>
                            <label className='label-fomr' htmlFor=''>
                                Disciplina deportiva (
                                <span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese la disciplina deportiva que dirige.'
                                icon='help circle'
                            />
                        </div>
                        <Dropdown
                            className='input-dropdown'
                            placeholder='Disiplina deportiva'
                            required
                            style={{ width: 300 }}
                            disabled={noEdit}
                            value={requestDisciplina.nombreDisciplina}
                            selection
                            options={disciplinas}
                            selectOnBlur={false}
                            onChange={(event, { value }) =>
                                setRequestDisciplina({
                                    ...requestDisciplina,
                                    nombreDisciplina: value
                                })
                            }
                        />
                    </div>
                </div>
                <div className='container-row-form'>
                    <div className='container-input'>
                        <div className='container-label' style={{width : 300}}>
                            <label className='label-fomr' htmlFor=''>
                                Género (<span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese el genero de la disciplina deportiva que dirige.'
                                icon='help circle'
                            />
                        </div>
                        <Dropdown
                            className='input-dropdown'
                            placeholder='Género'
                            style={{ width: 300 }}
                            required
                            disabled={noEdit}
                            value={requestDisciplina.generoDisciplina}
                            selection
                            options={GENEROS_VALIDOS}
                            selectOnBlur={false}
                            onChange={(event, { value }) =>
                                setRequestDisciplina({
                                    ...requestDisciplina,
                                    generoDisciplina: value
                                })
                            }
                        />
                    </div>
                </div>
                <div className='container-row-form'>
                    <div
                        className='container-buttons-form'
                        style={{ marginTop: 40 }}
                    >
                        <button
                            className='buttons-save-edit'
                            style={{ marginRight: 20 }}
                            onClick={() => saveDisciplinaEntrenador()}
                        >
                            GUARDAR
                        </button>
                        {/* Boton editar solo cuando el admin lo permita probar ese servicio*/}
                        <button
                            className='buttons-save-edit'
                            onClick={() => editDisciplinaEntrenador()}
                        >
                            EDITAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiDisciplina;
