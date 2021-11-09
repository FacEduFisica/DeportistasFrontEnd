import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ModalDetailConsultaDeport from './modalConsultaDeport';
import { BASE_URL, ERROR } from '../../../constantGlobal';
import authService from '../../../services/authService';
import { sweetAlert } from '../../actionsGlobals';

const ConsultaDeport = ({ key, consulta }) => {
    const {
        nombres,
        primerApellido,
        segundoApellido,
        numeroDocumento,
        fecha,
        telefonoResponsable,
        responsable,
        idEvaluacion
    } = consulta;

    // hook para guardar los datos de la consulta en detalle
    const [datosConsultaDetalle, setDatosConsultaDetalle] = useState({});

    //hook para abriar la modal para presentar los datos de dicha consulta en detalle
    const [modalDetailConsulta, setModalDetailConsulta] = useState(false);

    // funcion que permite abrir una consulta del fisioterapeuta en detalle
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
                    'Ha ocurrido un error en la consulta del detalle, intentelo de nuevo.'
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
                <span className='text-consulta-detail'>{`${nombres} ${primerApellido} ${segundoApellido}`}</span>
            </div>
            <div className='container-numero-documento'>
                <span className='text-consulta-detail'>{`N° Documento: ${numeroDocumento}`}</span>
            </div>
            <div className='container-fecha-consulta'>
                <span className='text-consulta-detail'>{`${moment(fecha).format(
                    'DD/MM/YYYY'
                )}`}</span>
            </div>
            <div className='container-responsable' style={{ width: 180 }}>
                <span className='text-consulta-detail'>{`Responsable: ${responsable}`}</span>
            </div>
            <div className='container-tel-responsable' style={{ width: 100 }}>
                <span className='text-consulta-detail'>{`Tel: ${telefonoResponsable}`}</span>
            </div>
            {modalDetailConsulta && (
                <ModalDetailConsultaDeport
                    setModalDetailConsulta={setModalDetailConsulta}
                    datosConsultaDetalle={datosConsultaDetalle}
                />
            )}
        </div>
    );
};

export default ConsultaDeport;
