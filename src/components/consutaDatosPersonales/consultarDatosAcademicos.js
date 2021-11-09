import React from 'react';

import './consultaDatosModal.css';

const ConsultaDatosAcademicos = ({ setModalConsulta, requestConsulta }) => {
    return (
        <div className='container-modal-consulta'>
            <div className='hoja' style={{ height: 400 }}>
                <div className='container-title-closed'>
                    <h2 className='title-consulta'> Mis datos Acádemicos</h2>
                    <button
                        className='button-closed'
                        onClick={() => setModalConsulta(false)}
                    >
                        <i className='x icon'></i>{' '}
                    </button>
                </div>
                <div className='container-text' style={{ height: 280 }}>
                    <div className='container-row-academicos'>
                        <span className='text-consuta'>
                            Tipo de aspirante:
                            <span className='content-text'>{`  ${requestConsulta.tipoAspirante} `}</span>
                        </span>
                        <span className='text-consuta'>
                            Año de ingreso:
                            <span className='content-text'>{`  ${requestConsulta.anioIngreso} `}</span>
                        </span>
                        <span className='text-consuta'>
                            Facultad:
                            <span className='content-text'>{`  ${requestConsulta.facultad}`}</span>
                        </span>
                    </div>
                    <div className='container-row-academicos'>
                        <span className='text-consuta'>
                            Programa acádemico:
                            <span className='content-text'>{`  ${requestConsulta.programaAcademico}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Tipo de estudio:
                            <span className='content-text'>{`  ${requestConsulta.tipoEstudio}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Semestre actual:
                            <span className='content-text'>{`  ${requestConsulta.semestreActual}`}</span>
                        </span>
                    </div>
                    <div className='container-row-academicos'>
                        <span className='text-consuta'>
                            Promedio acumulado:
                            <span className='content-text'>{`  ${requestConsulta.promedioAcumulado}`}</span>
                        </span>
                        <span className='text-consuta'>
                            Sede:
                            <span className='content-text'>{`  ${requestConsulta.sede}`}</span>
                        </span>
                        <span className='text-consuta'>
                            <span className='content-text'></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultaDatosAcademicos;
