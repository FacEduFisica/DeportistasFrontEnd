import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import authService from '../../../services/authService';
import ModalDetailConsulta from './modalConsulta';
import { BASE_URL, ERROR } from '../../../constantGlobal';
import { sweetAlert } from '../../actionsGlobals';

const Consulta = ({ key, consulta }) => {
    const {
        nombres,
        primerApellido,
        segundoApellido,
        numeroDocumento,
        fecha,
        responsable,
        telefonoResponsable,
        idEvaluacion
    } = consulta;

    // hook para guardar los datos de la consulta en detalle
    const [datosConsultaDetalle, setDatosConsultaDetalle] = useState({});

    //hook para abriar la modal para presentar los datos de dicha consulta en detalle
    const [modalDetailConsulta, setModalDetailConsulta] = useState(false);

    // funcion para ver en detalle la consulta realizada
    const viewConsultaDetail = async () => {
        try {
            let token = authService.getToken();

            const response = await axios.get(
                `${BASE_URL}/deportologo/obtenerevaluacion/${idEvaluacion}?token=${token}`
            );
            
            if (response.data.codigo === '0000') {
                setDatosConsultaDetalle(
                    Object.assign(
                        {},
                        datosConsultaDetalle,
                        response.data.datosUsuario
                    )
                );
                setModalDetailConsulta(true);
            } else {
                sweetAlert(
                    ERROR,
                    'Error',
                    'Ha ocurrido un error en la consulta en detalle, intentelo de nuevo.'
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className='item-consulta'
            key={key}
            onClick={() => viewConsultaDetail()}
        >
            <div className='container-name-apellido'>
                <span className="text-consulta-detail">{`${nombres} ${primerApellido} ${segundoApellido}`}</span>
            </div>
            <div className='container-numero-documento'>
                <span className="text-consulta-detail">{`N° Documento: ${numeroDocumento}`}</span>
            </div>
            <div className='container-fecha-consulta'>
                <span className="text-consulta-detail">{`${moment(fecha).format('DD/MM/YYYY')}`}</span>
            </div>
            <div className='container-responsable'>
                <span className="text-consulta-detail">{`Responsable: ${responsable}`}</span>
            </div>
            <div className='container-tel-responsable'>
                <span className="text-consulta-detail">{`Tel: ${telefonoResponsable}`}</span>
            </div>
            {modalDetailConsulta && (
                <ModalDetailConsulta
                    setModalDetailConsulta={setModalDetailConsulta}
                    datosConsultaDetalle={datosConsultaDetalle}
                />
            )}
        </div>
    );
};

export default Consulta;
