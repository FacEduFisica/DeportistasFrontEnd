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
        fechaIngreso,
        cedulaFisioterapeuta,
        planTratamiento,
        observaciones
    } = datosConsultaDetalle;

    // funcion para detener el stop propagation y cerrar la modal
    const closeModal = event => {
        event.stopPropagation();
        setModalDetailConsulta(false);
    };

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
                        <span>Fecha ingreso:</span>
                        {` ${moment(fechaIngreso).format('DD/MM/YYYY')}`}
                    </span>
                    <span className='info-consulta-text'>
                        {' '}
                        <span>N° documento del fisioterapeuta:</span>
                        {` ${cedulaFisioterapeuta}`}
                    </span>
                    <span className='info-consulta-text'>
                        <span>Plan de tratamiento:</span>
                        {` ${planTratamiento}`}
                    </span>
                    <span className='info-consulta-text'>{`Observaciones: ${observaciones}`}</span>
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
