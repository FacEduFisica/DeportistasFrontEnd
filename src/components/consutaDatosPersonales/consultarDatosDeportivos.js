import React from 'react';
import moment from 'moment';

import './consultaDatosModal.css';

const ConsultaDatosDeportivos = ({ setModalConsulta, requestConsulta }) => {
    return (
        <div className='container-modal-consulta'>
            <div className='hoja' style={{ height: 440 }}>
                <div className='container-title-closed'>
                    <h2 className='title-consulta'> Mis datos Deportivos</h2>
                    <button
                        className='button-closed'
                        onClick={() => setModalConsulta(false)}
                    >
                        <i className='x icon'></i>{' '}
                    </button>
                </div>
                <div className='container-text' style={{ height: 320 }}>
                    <div className='container-row-deportivo'>
                        <span className='text-consuta'>
                            Fecha de inscripcion:
                            <span className='content-text'>{`  ${moment(
                                requestConsulta.fechaInscripcion
                            ).format('DD/MM/YYYY')} `}</span>
                        </span>
                        <span className='text-consuta'>
                            Género:
                            <span className='content-text'>{`  ${requestConsulta.genero} `}</span>
                        </span>
                        <span className='text-consuta'>
                            Disciplina deportiva:
                            <span className='content-text'>{`  ${requestConsulta.disciplinaDeportiva}`}</span>
                        </span>
                    </div>
                    <div className='container-row-deportivo'>
                        <span className='text-consuta'>
                            Especialidad deportiva:
                            <span className='content-text'>{`  ${requestConsulta.especialidad}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Categorización:
                            <span className='content-text'>{`  ${requestConsulta.categorizacion}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Tipo de deportista:
                            <span className='content-text'>{`  ${requestConsulta.tipoDeportista}`}</span>
                        </span>
                    </div>
                    <div className='container-row-deportivo'>
                        <span className='text-consuta'>
                            Nivel deportivo:
                            <span className='content-text'>{`  ${requestConsulta.nivelDeportivo}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Nivel olimpico:
                            <span className='content-text'>{`  ${requestConsulta.cicloOlimpico}`}</span>
                        </span>
                        <span className='text-consuta'>
                            {requestConsulta.cicloOlimpico === 'SI'
                                ? 'Nivel olimpico actual'
                                : ''}
                            {requestConsulta.cicloOlimpico === 'SI' ? (
                                <span className='content-text'>{`  ${requestConsulta.cicloOlimpicoActual}`}</span>
                            ) : null}
                        </span>
                    </div>
                    <div className='container-row-deportivo'>
                        <span className='text-consuta'>
                            Mayor logro obtenido:
                            <span className='content-text'>{`  ${requestConsulta.mayorLogroObtenido}`}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultaDatosDeportivos;
