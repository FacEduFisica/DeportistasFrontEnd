import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import authService from '../../services/authService';
// import ModalDetailConsulta from './modalConsulta';
import { BASE_URL, ERROR } from '../../constantGlobal';
import { sweetAlert } from '../actionsGlobals';

const Deportista = ({ key, deportista }) => {
    const {
        nombres,
        primerApellido,
        segundoApellido,
        numeroDocumento,
        fechaRegistro,
        edad,
        email,
        _id
    } = deportista;

    // hook para guardar los datos de la consulta en detalle
    const [datosConsultaDetalle, setDatosConsultaDetalle] = useState({});

    //hook para abriar la modal para presentar los datos de dicha consulta en detalle
    const [modalDetaildeportista, setModalDetaildeportista] = useState(false);

    // funcion para ver en detalle la consulta realizada
    const viewDeportistaDetail = async () => {
        try {
            let token = authService.getToken();

            const response = await axios.get(
                `${BASE_URL}/fisioterapia/obtenerdatos/${numeroDocumento}?token=${token}`
            );
            
            if (response.data.codigo === '0000') {
                setDatosConsultaDetalle(
                    Object.assign(
                        {},
                        datosConsultaDetalle,
                        response.data.datosRegistroFisioterapia
                    )
                );
                setModalDetaildeportista(true);
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
            onClick={() => viewDeportistaDetail()}
        >
            <div className='container-name-apellido' style={{ width: 200 }}>
                <span className='text-consulta-detail'>{`${nombres} ${primerApellido} ${segundoApellido}`}</span>
            </div>
            <div className='container-numero-documento'>
                <span className='text-consulta-detail'>{`N° Documento: ${numeroDocumento}`}</span>
            </div>
            <div className='container-responsable' style={{ width: 60 }}>
                <span className='text-consulta-detail'>{`Edad: ${edad}`}</span>
            </div>
            <div className='container-fecha-consulta' style={{ width: 140 }}>
                <span className='text-consulta-detail'>{`Registro: ${moment(
                    fechaRegistro
                ).format('DD/MM/YYYY')}`}</span>
            </div>
            <div className='container-tel-responsable' style={{ width: 230 }}>
                <span className='text-consulta-detail'>{`Correo: ${email}`}</span>
            </div>
            {/* {modalDetaildeportista && (
                <ModalDetailDeportista
                    setModalDetailConsulta={setModalDetailConsulta}
                    datosConsultaDetalle={datosConsultaDetalle}
                />
            )} */}
        </div>
    );
};

export default Deportista;
