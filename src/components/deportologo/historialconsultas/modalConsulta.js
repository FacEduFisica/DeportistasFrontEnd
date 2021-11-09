import React from 'react';
import moment from 'moment';

const ModalDetailConsulta = ({
    setModalDetailConsulta,
    datosConsultaDetalle
}) => {
    const {
        nombres,
        primerApellido,
        segundoApellido,
        numeroDocumento,
        fecha,
        cedulaDeportologo,
        opinionPlan,
        diagnostico
    } = datosConsultaDetalle;

    // funcion para detener el stop propagation y cerrar la modal
    const closeModal = event => {
        event.stopPropagation();
        setModalDetailConsulta(false);
    }

    return (
        <div className='modal-consultaDetalle'>
            <div className='container-modal-consultaDetalle'>
                <div className='container-title-close-consultaDetalle'>
                    <h3 className='title-consulta-detail'>{`Datos de la consulta con ${nombres} ${primerApellido}`}</h3>
                    <button
                        className='button-closed-consulta'
                        onClick={event => closeModal(event)}
                    >
                        <i className='x icon'></i>
                    </button>
                </div>
                <div className='container-info-consultaDetalle'>
                    <span className='info-consulta-text'>
                        <span>Paciente:</span>
                        {` ${nombres} ${primerApellido} ${segundoApellido}`}
                    </span>
                    <span className='info-consulta-text'>
                        <span>N° documento:</span>
                        {` ${numeroDocumento}`}
                    </span>
                    <span className='info-consulta-text'>
                        {' '}
                        <span>Fecha de la consulta:</span>
                        {` ${moment(fecha).format('DD/MM/YYYY')}`}
                    </span>
                    <span className='info-consulta-text'>
                        {' '}
                        <span>N° documento del deportologo:</span>
                        {` ${cedulaDeportologo}`}
                    </span>
                    <span className='info-consulta-text'>
                        <span>Diagnostico:</span>
                        {` ${diagnostico}`}
                    </span>
                    <span className='info-consulta-text'>{`Opinión y plan: ${opinionPlan}`}</span>
                </div>
                <div className='container-button-okConsultaDetail'>
                    <button
                        className='button-entendido'
                        onClick={event => closeModal(event)}
                    >
                        ENTENDIDO <i className='check icon'></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDetailConsulta;
