import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Tooltip from '../../common/tooltip';
import authService from '../../../services/authService';
import { sweetAlert } from '../../actionsGlobals';
import {
    MESSAGE_NOFOUND_CEDULA,
    MESSAGE_NOFOUND_STUDENT
} from '../../FormConstants/constants';
import { WARNING, BASE_URL, ERROR } from '../../../constantGlobal';

const ModalPacienteFisio = ({ setModalpaciente }) => {
    // hook que permite guardar la cedula del paciente y realizar la busqueda
    const [cedulaPaciente, setCedulaPaciente] = useState('');

    // hook para guardar la informacion traida desde la base de datos, info del paciente.
    const [infoPaciente, setInfoPaciente] = useState({});

    // hook para mostar la informacion del paciente
    const [viewInfo, setViewInfo] = useState(false);

    // hook para el mensaje de cargando
    const [cargando, setCargando] = useState(false);

    // funcion que ejecuta el metodo get para traer la informacion del paciente
    const searchInfoPaciente = async () => {
        setCargando(true);
        if (cedulaPaciente) {
            try {
                let token = authService.getToken();

                const response = await axios.get(
                    `${BASE_URL}/fisioterapia/obtenerdatos/${cedulaPaciente}?token=${token}`
                );

                if (response.data.codigo === '0000') {
                    const {
                        data: { datosRegistroFisioterapia }
                    } = response;

                    setInfoPaciente(
                        Object.assign(
                            {},
                            infoPaciente,
                            datosRegistroFisioterapia
                        )
                    );
                    setViewInfo(true);
                    setCargando(false);
                } else if (response.data.codigo === '0011') {
                    sweetAlert(
                        ERROR,
                        'Error',
                        'El usuairo que intenta buscar no esta registrado en la aplicación'
                    );
                } else if (response.data.codigo === '0004') {
                    sweetAlert(WARNING, 'Atención', MESSAGE_NOFOUND_STUDENT);
                } else {
                    sweetAlert(ERROR, 'Error', MESSAGE_NOFOUND_CEDULA);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            sweetAlert(
                WARNING,
                '¡Atención!',
                'Es necesario ingresar la cedula para buscar al paciente'
            );
            setCargando(false);
        }
    };

    return (
        <div className='modal-paciente'>
            <div className='container-modal-paciente' style={{width : 750}}>
                <div className='container-title-paciente'>
                    <h2 className='title-buscar-paciente'>
                        Ingrese la cedula del paciente
                    </h2>
                    <button
                        className='button-closed'
                        onClick={() => setModalpaciente(false)}
                    >
                        <i className='x icon'></i>{' '}
                    </button>
                </div>
                <div className='containr-consulta-paciente'>
                    <div className='container-search-paciente'>
                        <span className='label-paciente-cedula'>Cedula : </span>
                        <input
                            type='text'
                            className='input-paciente'
                            onChange={({ target: { value } }) =>
                                setCedulaPaciente(value)
                            }
                        />
                        <button
                            className='button-search-paciente'
                            onClick={() => searchInfoPaciente()}
                        >
                            <Tooltip text='Buscar paciente' icon='search' />
                        </button>
                    </div>
                </div>
                {viewInfo ? (
                    <div className='container-info-paciente' >
                        <div className='infoPaciente'>
                            <span className='text-info-paciente'>{`${infoPaciente.nombres} ${infoPaciente.primerApellido} ${infoPaciente.segundoApellido}`}</span>
                            <span className='text-info-paciente'>{`${infoPaciente.edad} años`}</span>
                        </div>
                        <div className='infoPaciente'>
                            <span className='text-info-paciente'>{`Fecha de nacimiento: ${moment(
                                infoPaciente.fechaNacimiento
                            ).format('DD/MM/YYYY')}`}</span>
                            <span className='text-info-paciente'>{`Genero: ${infoPaciente.sexo}`}</span>
                        </div>
                        <div className='infoPaciente'>
                            <span className='text-info-paciente'>{`Correo: ${infoPaciente.correo}`}</span>
                            <span className='text-info-paciente'>{`Teléfono: ${infoPaciente.celular}`}</span>
                        </div>
                        <div className='infoPaciente'>
                            <span className='text-info-paciente'>{`Programa acádemico: ${infoPaciente.programaAcademico}`}</span>
                            <span className='text-info-paciente'>{`Disciplina: ${infoPaciente.disciplinaDeportiva}`}</span>
                        </div>
                    </div>
                ) : cargando ? (
                    <span className='cargando-info-paciente'>Cargando ...</span>
                ) : (
                    <span className='piepagina-busqueda'>
                        Realice la busqueda para mostrar la información del
                        paciente.
                    </span>
                )}
            </div>
        </div>
    );
};

export default ModalPacienteFisio;
