import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tooltip from '../common/tooltip';
import InfoApp from '../common/infoApp';
import authService from '../../services/authService';
import ConsultaDatosAcademicos from '../consutaDatosPersonales/consultarDatosAcademicos';
import { sweetAlert } from '../actionsGlobals';
import { WARNING, SUCCESS, BASE_URL, ERROR } from '../../constantGlobal';
import {
    MESSAGE_NO_EDIT,
    MESSAGE_FIELD_REQUARED_GENERIC,
    TIPO_ASPIRANTE,
    FACULTAD_VALIDA,
    SEDE_VALIDA,
    MESSAGE_SUCCESS_FORM,
    TIPO_DE_ESTUDIO,
    MESSAGE_SUCCESS_FORM_EDIT,
    MESSAGE_FORM_SAVED,
    SEMESTRE_ACTUAL
} from '../FormConstants/constants';
import { Dropdown } from 'semantic-ui-react';

import '../FormConstants/formsStyles.css';

const AcademicForm = () => {
    // hook encargado de guardar la respuesta de la peticion
    const [isEditable, setIsEditable] = useState(false);
    
    // hook para deshabilitar los campos del form luego de guardarlo
    const [noEdit, setNoEdit] = useState(false);

    // hook para abrir la modal para mostrar la infomarcion de la consulta
    const [modalConsulta, setModalConsulta] = useState(false);

    // hook que permite abrir la info de la app
    const [openModalInfo, setOpenInfoModal] = useState(false);

    // hook para guardar los datos personales, con la api de consulta
    const [requestConsulta, setRequestConsult] = useState({});

    // hook para capturar las respuestas del form y armar el request de la api
    const [requestAcademic, setRequestAcademic] = useState({
        tipoAspirante: '',
        anioIngreso: '',
        facultad: '',
        programaAcademico: '',
        semestreActual: '',
        tipoEstudio: '',
        promedioAcumulado: '',
        sede: ''
    });

    // useEffet, validaremos que el form ya este diligenciado. y si se puede editar
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
            .catch(error => console.log(error))

        axios
            .get(`${BASE_URL}/user/datosinstitucionales/${id}?token=${token}`)
            .then(response => {
                const {
                    data: { codigo, datosInstitucionales }
                } = response;
                if (codigo === '0000') {
                    if (isEditable) {
                        setNoEdit(false);
                    } else {
                        setNoEdit(true);
                    }
                    
                    setRequestAcademic(
                        Object.assign({}, requestAcademic, {
                            tipoAspirante: datosInstitucionales.tipoAspirante,
                            anioIngreso: datosInstitucionales.anioIngreso,
                            facultad: datosInstitucionales.facultad,
                            programaAcademico:
                                datosInstitucionales.programaAcademico,
                            semestreActual: datosInstitucionales.semestreActual,
                            tipoEstudio: datosInstitucionales.tipoEstudio,
                            promedioAcumulado:
                                datosInstitucionales.promedioAcumulado,
                            sede: datosInstitucionales.sede
                        })
                    );
                }
            })
            .catch(error => console.log(error));
    }, [isEditable, requestAcademic]);

    // funcion para guardar el formulario y enviar el request a la api
    const saveAcademicForm = async () => {
        const values = Object.values(requestAcademic);
        const valuesValidate = values.filter(item => item !== '');

        if (noEdit) {
            sweetAlert(WARNING, 'Atención', MESSAGE_FORM_SAVED);
        } else {
            if (valuesValidate.length === 8) {
                let token = authService.getToken();
                let id = authService.getUserId();

                if (isEditable) {
                    try {
                        const response = await axios.put(
                            `${BASE_URL}/user/datosinstitucionales/${id}?token=${token}`,
                            requestAcademic
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
                            `${BASE_URL}/user/datosinstitucionales/${id}?token=${token}`,
                            requestAcademic
                        );

                        if (response.data.codigo === '0000') {
                            sweetAlert(
                                SUCCESS,
                                '¡Éxito!',
                                MESSAGE_SUCCESS_FORM
                            );
                            setNoEdit(true);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                sweetAlert(WARNING, 'Atención', MESSAGE_FIELD_REQUARED_GENERIC);
            }
        }
    };

    // funcion para haabilitar el formulario y editarlo.
    const editAcademicForm = () => {
        if (noEdit) {
            if (isEditable) {
                setNoEdit(false);
                sweetAlert(
                    SUCCESS,
                    '¡Éxito!',
                    'Puede proceder a editar su formulario acádemico y guardarlo, asegurese de diligenciar el formulario de manera correcta.'
                );
            } else {
                sweetAlert(WARNING, 'Atención', MESSAGE_NO_EDIT);
            }
        } else {
            sweetAlert(
                WARNING,
                'Atención',
                'Puede diligenciar el formulario y guardar.'
            );
        }
    };

    // funcion para consultar la informacion del usuario y mostrarla en la modal
    const consultaInfo = async () => {
        try {
            let token = authService.getToken();
            let id = authService.getUserId();

            const response = await axios.get(
                `${BASE_URL}/user/datosinstitucionales/${id}?token=${token}`
            );

            if (response.data.codigo === '0000') {
                const {
                    data: { datosInstitucionales }
                } = response;
                
                setRequestConsult(
                    Object.assign({}, requestConsulta, datosInstitucionales)
                );
                setModalConsulta(true);
            } else {
                sweetAlert(
                    ERROR,
                    'Error',
                    'Ocurrio un error con la consulta de los datos.'
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container-form-sgdar'>
            <h1 className='title-form'>Ingresa tus datos acádemicos</h1>
            <div className='form-sgdar'>
                <div className='container-row-form'>
                    <div className='container-input'>
                        <div className='container-label'>
                            <label className='label-fomr' htmlFor=''>
                                Tipo de aspirante (
                                <span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese tipo de aspirante'
                                icon='help circle'
                            />
                        </div>
                        <Dropdown
                            className='input-dropdown'
                            placeholder='Tipo aspirante'
                            required
                            disabled={noEdit}
                            value={requestAcademic.tipoAspirante}
                            selection
                            options={TIPO_ASPIRANTE}
                            selectOnBlur={false}
                            onChange={(event, { value }) =>
                                setRequestAcademic({
                                    ...requestAcademic,
                                    tipoAspirante: value
                                })
                            }
                        />
                    </div>
                    <div className='container-input'>
                        <div className='container-label'>
                            <label className='label-fomr' htmlFor=''>
                                Año de ingreso (
                                <span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese el año en el cual empezo a estudiar en el Politécnico JIC'
                                icon='help circle'
                            />
                        </div>
                        <input
                            className='input-form'
                            type='text'
                            placeholder='Año de ingreso'
                            required
                            disabled={noEdit}
                            value={requestAcademic.anioIngreso}
                            onChange={({ target: { value } }) =>
                                setRequestAcademic({
                                    ...requestAcademic,
                                    anioIngreso: value
                                })
                            }
                        />
                    </div>
                    <div className='container-input'>
                        <div className='container-label'>
                            <label className='label-fomr' htmlFor=''>
                                Facultad (<span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese la facultad a la cual pertenece'
                                icon='help circle'
                            />
                        </div>
                        <Dropdown
                            className='input-dropdown'
                            placeholder='Facultad'
                            required
                            disabled={noEdit}
                            value={requestAcademic.facultad}
                            selection
                            options={FACULTAD_VALIDA}
                            selectOnBlur={false}
                            onChange={(event, { value }) =>
                                setRequestAcademic({
                                    ...requestAcademic,
                                    facultad: value
                                })
                            }
                        />
                    </div>
                </div>
                <div className='container-row-form'>
                    <div className='container-input'>
                        <div className='container-label'>
                            <label className='label-fomr' htmlFor=''>
                                Programa acádemico (
                                <span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese el programa acádemico en el cual se encuentra matriculado'
                                icon='help circle'
                            />
                        </div>
                        <input
                            className='input-form'
                            type='text'
                            disabled={noEdit}
                            placeholder='Programa acádemico'
                            required
                            value={requestAcademic.programaAcademico}
                            onChange={({ target: { value } }) =>
                                setRequestAcademic({
                                    ...requestAcademic,
                                    programaAcademico: value
                                })
                            }
                        />
                    </div>
                    <div className='container-input'>
                        <div className='container-label'>
                            <label className='label-fomr' htmlFor=''>
                                Tipo de estudio (
                                <span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese tipo de estudio, pregrado ó postgrado'
                                icon='help circle'
                            />
                        </div>
                        <Dropdown
                            className='input-dropdown'
                            required
                            disabled={noEdit}
                            value={requestAcademic.tipoEstudio}
                            selection
                            options={TIPO_DE_ESTUDIO}
                            selectOnBlur={false}
                            onChange={(event, { value }) =>
                                setRequestAcademic({
                                    ...requestAcademic,
                                    tipoEstudio: value
                                })
                            }
                        />
                    </div>
                    <div className='container-input'>
                        <div className='container-label'>
                            <label className='label-fomr' htmlFor=''>
                                Semestre actual (
                                <span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese el semestre actual'
                                icon='help circle'
                            />
                        </div>
                        <Dropdown
                            className='input-dropdown'
                            required
                            placeholder='Semestre actual'
                            disabled={noEdit}
                            value={requestAcademic.semestreActual}
                            selection
                            options={SEMESTRE_ACTUAL}
                            selectOnBlur={false}
                            onChange={(event, { value }) =>
                                setRequestAcademic({
                                    ...requestAcademic,
                                    semestreActual: value
                                })
                            }
                        />
                    </div>
                </div>
                <div className='container-row-form'>
                    <div className='container-input'>
                        <div className='container-label'>
                            <label className='label-fomr' htmlFor=''>
                                Promedio acumulado (
                                <span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese el promedio acumulado'
                                icon='help circle'
                            />
                        </div>
                        <input
                            className='input-form'
                            type='number'
                            placeholder='Promedio acumulado'
                            required
                            disabled={noEdit}
                            value={requestAcademic.promedioAcumulado}
                            onChange={({ target: { value } }) =>
                                setRequestAcademic({
                                    ...requestAcademic,
                                    promedioAcumulado: value
                                })
                            }
                        />
                    </div>
                    <div className='container-input'>
                        <div className='container-label'>
                            <label className='label-fomr' htmlFor=''>
                                Sede (<span className='isRequired'>*</span>)
                            </label>
                            <Tooltip
                                text='Ingrese la sede en la cual se encuentra matriculado'
                                icon='help circle'
                            />
                        </div>
                        <Dropdown
                            className='input-dropdown'
                            placeholder='Sede'
                            required
                            value={requestAcademic.sede}
                            selection
                            disabled={noEdit}
                            options={SEDE_VALIDA}
                            selectOnBlur={false}
                            onChange={(event, { value }) =>
                                setRequestAcademic({
                                    ...requestAcademic,
                                    sede: value
                                })
                            }
                        />
                    </div>
                </div>
            </div>
            <div className='container-buttons-form'>
                <button
                    className='buttons-save-edit'
                    onClick={saveAcademicForm}
                >
                    GUARDAR
                </button>
                {/* Boton editar solo cuando el admin lo permita probar ese servicio*/}
                <button
                    className='buttons-save-edit'
                    onClick={editAcademicForm}
                >
                    EDITAR
                </button>
            </div>
            <div className='container-info-consult'>
                <button
                    className='button-info-personal'
                    onClick={() => consultaInfo()}
                >
                    CONSULTAR <i className='address card outline icon'></i>
                </button>
                {modalConsulta && (
                    <ConsultaDatosAcademicos
                        setModalConsulta={setModalConsulta}
                        requestConsulta={requestConsulta}
                    />
                )}
                <button
                    className='button-info-app'
                    onClick={() => setOpenInfoModal(true)}
                >
                    <i className='info icon'></i>
                </button>
            </div>
            {openModalInfo && <InfoApp setOpenInfoModal={setOpenInfoModal} />}
        </div>
    );
};

export default AcademicForm;
