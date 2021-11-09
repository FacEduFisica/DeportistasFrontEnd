import React from 'react';
import moment from 'moment';

import './consultaDatosModal.css';

const ConsultaDatosPersonales = ({ setModalConsulta, requestConsulta }) => {
    return (
        <div className='container-modal-consulta'>
            <div className='hoja'>
                <div className='container-title-closed'>
                    <h2 className='title-consulta'> Mis datos personales</h2>
                    <button
                        className='button-closed'
                        onClick={() => setModalConsulta(false)}
                    >
                        <i className='x icon'></i>{' '}
                    </button>
                </div>
                <div className='container-text'>
                    <div className="container-row-personales">
                        <span className='text-consuta'>
                            Nombre:
                            <span className='content-text'>{`  ${requestConsulta.nombres} ${requestConsulta.primerApellido} ${requestConsulta.segundoApellido}`}</span>{' '}
                        </span>
                        <span className='text-consuta'>
                            Fecha de nacimiento:
                            <span className='content-text'>{`  ${moment(requestConsulta.fechaNacimiento).format('DD/MM/YYYY')}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Edad:
                            <span className='content-text'>{`  ${requestConsulta.edad}`}</span>
                        </span>
                    </div>

                    <div className='container-row-personales'>
                        <span className='text-consuta'>
                            N° Documento:
                            <span className='content-text'>{`  ${requestConsulta.tipoDocumento} ${requestConsulta.numeroDocumento}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Lugar de expedición:
                            <span className='content-text'>{`  ${requestConsulta.lugarExpedicionDocumento}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Pais de nacimiento:
                            <span className='content-text'>{`  ${requestConsulta.paisNacimiento}`}</span>
                        </span>
                    </div>

                    <div className='container-row-personales'>
                        <span className='text-consuta'>
                            Genero:{' '}
                            <span className='content-text'>{`  ${requestConsulta.sexo}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Estado civil:{' '}
                            <span className='content-text'>{`  ${requestConsulta.estadoCivil}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Seguridad social:{' '}
                            <span className='content-text'>{`  ${requestConsulta.eps}`}</span>
                        </span>
                    </div>

                    <div className='container-row-personales'>
                        <span className='text-consuta'>
                            Grupo sanguineo:
                            <span className='content-text'>{`  ${requestConsulta.grupoSanguineo}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Peso:{' '}
                            <span className='content-text'>
                                {`  ${requestConsulta.peso}`}{' '}
                            </span>{' '}
                            kg
                        </span>
                        <span className='text-consuta'>
                            Talla:{' '}
                            <span className='content-text'>
                                {`  ${requestConsulta.talla}`}{' '}
                            </span>{' '}
                            mts
                        </span>
                    </div>

                    <div className='container-row-personales'>
                        <span className='text-consuta'>
                            Tiene alguna discapacidad:
                            <span className='content-text'>{`  ${requestConsulta.discapacidad}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Tipo de discapacidad:
                            <span className='content-text'>{`  ${requestConsulta.tipoDiscapacidad}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Etnia:{' '}
                            <span className='content-text'>{`  ${requestConsulta.etnia}`}</span>
                        </span>
                    </div>

                    <div className='container-row-personales'>
                        <span className='text-consuta'>
                            Despazado:{' '}
                            <span className='content-text'>{`  ${requestConsulta.desplazado}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Trabaja:{' '}
                            <span className='content-text'>{`  ${requestConsulta.trabaja}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Cabeza de hogar:
                            <span className='content-text'>{`  ${requestConsulta.cabezaHogar}`}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultaDatosPersonales;
