import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { sweetAlert } from '../actionsGlobals';
import { WARNING, BASE_URL, ERROR, SUCCESS } from '../../constantGlobal';
import authService from '../../services/authService';
import Tooltip from '../common/tooltip';
import InfoApp from '../common/infoApp';
import ModalPacienteFisio from './paciente/modalPacienteFisio';
import {
    RESET_FORM_FISIO,
    MESSAGE_NOFOUND_STUDENT,
    ANTECEDENTES_PERSONALES
} from '../FormConstants/constants';

const FormFisioterapia = () => {
    // hook modal de informacion de la aplicacion
    const [openModalInfo, setOpenInfoModal] = useState(false);

    // hook para bloquear los campos que se consultan
    const [noEdit, setNoEdit] = useState(false);

    // hook para caputrar la cedula del paciente y buscar todos los campos y mapearlos en el form
    const [cedulaPaciente, setCedulaPaciente] = useState('');

    // hook paginador formulario fisioterapeuta
    const [pagina, setPagina] = useState(0);

    // hook que controla la modal en donde se consulta la informacion del paciente.
    const [modalPaciente, setModalpaciente] = useState(false);

    // hook para capturar el idDeportista para usarlo en la api
    const [idPaciente, setIdPaciente] = useState('');

    // hook para guardar el formulario del fisioterapeuta
    const [requestFormFisio, setRequestFormFisio] = useState({
        nombres: '',
        tipoDocumento: '',
        numeroDocumento: '',
        sexo: '',
        edad: '',
        talla: '',
        peso: '',
        fechaNacimiento: '',
        celular: '',
        correo: '',
        facultad: '',
        programaAcademico: '',
        semestre: '',
        eps: '',
        disciplinaDeportiva: '',
        diagnosticoMedico: '',
        medicoRemite: '',
        recomendacionMedica: '',
        fechaIngreso: '',
        antecedentesPersonales: '',
        antecedentesFamiliares: '',
        evaluacionInicial: '',
        estadoPiel: '',
        sensibilidad: '',
        dolor: '',
        arcosMovilidad: '',
        fuerzaMuscular: '',
        flexibilidad: '',
        pruebasSimiologicas: '',
        posturaMarcha: '',
        observaciones: '',
        planTratamiento: '',
        cedulaFisioterapeuta: ''
    });

    // funcion para buscar la informacion del paciente y ingresarla en el formulario
    const consultDataPaciente = async () => {
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
                    setRequestFormFisio(
                        Object.assign({}, requestFormFisio, {
                            nombres: datosRegistroFisioterapia.nombres,
                            tipoDocumento:
                                datosRegistroFisioterapia.tipoDocumento,
                            numeroDocumento:
                                datosRegistroFisioterapia.numeroDocumento,
                            sexo: datosRegistroFisioterapia.sexo,
                            edad: datosRegistroFisioterapia.edad,
                            talla: datosRegistroFisioterapia.talla,
                            peso: datosRegistroFisioterapia.peso,
                            fechaNacimiento:
                                datosRegistroFisioterapia.fechaNacimiento,
                            celular: datosRegistroFisioterapia.celular,
                            correo: datosRegistroFisioterapia.correo,
                            facultad: datosRegistroFisioterapia.facultad,
                            programaAcademico:
                                datosRegistroFisioterapia.programaAcademico,
                            semestre: datosRegistroFisioterapia.semestreActual,
                            eps: datosRegistroFisioterapia.eps,
                            disciplinaDeportiva:
                                datosRegistroFisioterapia.disciplinaDeportiva,
                            diagnosticoMedico:
                                datosRegistroFisioterapia.diagnosticoMedico,
                            medicoRemite:
                                datosRegistroFisioterapia.medicoRemite,
                            recomendacionMedica:
                                datosRegistroFisioterapia.recomendacionMedica
                        })
                    );
                    setNoEdit(true);
                    setIdPaciente(datosRegistroFisioterapia._id);
                } else if (response.data.codigo === '0004') {
                    sweetAlert(WARNING, 'Atención', MESSAGE_NOFOUND_STUDENT);
                } else if (response.data.codigo === '0011') {
                    sweetAlert(
                        ERROR,
                        'Error',
                        'El usuario que intenta buscar no esta registrado en la aplicación.'
                    );
                } else {
                    sweetAlert(
                        ERROR,
                        'Error',
                        'Ha ocurrido un error en el servidor, intentelo de nuevo.'
                    );
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            sweetAlert(
                WARNING,
                'Atención',
                'Es necesario ingrsar el documento del paciente para buscar sus datos.'
            );
        }
    };

    // funcion para guardar el formulario del fisioterapeuta
    const saveFormFisioterapia = async () => {
        const values = Object.values(requestFormFisio);
        const validateValues = values.filter(item => item !== '');

        if (validateValues.length === 33) {
            try {
                let token = authService.getToken();
                let id = authService.getUserId();

                const response = await axios.post(
                    `${BASE_URL}/fisioterapia/registrardatos/${id}/${idPaciente}?token=${token}`,
                    requestFormFisio
                );

                if (response.data.codigo === '0000') {
                    sweetAlert(
                        SUCCESS,
                        '¡Éxito!',
                        'El formulario ha sido guardado exitosamente.'
                    );
                    setRequestFormFisio({}, requestFormFisio, RESET_FORM_FISIO);
                    setNoEdit(false);
                    setPagina(0);
                    setCedulaPaciente('');
                } else {
                    sweetAlert(
                        ERROR,
                        'Error',
                        'Ha ocurrido un error al guardar el formulario intentelo de nuevo porfavor.'
                    );
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            sweetAlert(
                WARNING,
                'Atención',
                'Todos los campos son obligatorios para guardar el formulario fisioterapeutico.'
            );
        }
    };

    // funcion que permite abrir la modal para consultar la informacion del paciente.
    const consultaInfoPaciente = () => {
        setModalpaciente(true);
    };

    return (
        <div className='container-form-sgdar'>
            <h1 className='title-form'>Formulario Fisioterapeuta</h1>
            {pagina === 0 && (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Número documento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese numero de documento del documento para consultar datos del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                disabled={noEdit}
                                onBlur={() => consultDataPaciente()}
                                value={cedulaPaciente}
                                placeholder='Número de documento'
                                onChange={event =>
                                    setCedulaPaciente(event.target.value)
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Tipo de documento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará el tipo de documento del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.tipoDocumento}
                                placeholder='Tipo de documento'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    {`Nombre(s)`} (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará el nombre del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.nombres}
                                placeholder='Nombre(s)'
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Sexo (<span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará el genero del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.sexo}
                                placeholder='Sexo'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Edad (<span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará la edad del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.edad}
                                placeholder='Edad'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Talla (<span className='isRequired'>*</span>
                                    )
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará la talla del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.talla}
                                placeholder='Talla'
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Peso (<span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese su primer apellido.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.talla}
                                placeholder='Talla'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Fecha de nacimiento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará la fecha de nacimineto del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.fechaNacimiento}
                                placeholder='Fecha de nacimiento.'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Celular (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará el celular del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.celular}
                                placeholder='Celular'
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Correo (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará el correo del estudiante.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.correo}
                                placeholder='Correo'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Facultad (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará la facultad del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.facultad}
                                placeholder='Facultad'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Programa acádemico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardara el programa acádemico del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.programaAcademico}
                                placeholder='Programa acádemico'
                            />
                        </div>
                    </div>
                </div>
            )}

            {pagina === 1 && (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Semestre actual (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará el semestre actual del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.semestre}
                                placeholder='Semestre actual'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Seguridad social (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará el tipo de seguridad social que tiene el paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.eps}
                                placeholder='Seguridad social'
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Disciplina deportiva (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará la disciplina deportiva que práctica el paciente'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.disciplinaDeportiva}
                                placeholder='Disciplina deportiva'
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Medico remite (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará el médico que remitio al paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormFisio.medicoRemite}
                                placeholder='Médico remite'
                            />
                        </div>

                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Fecha de ingreso (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese de ingreso del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='date'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.fechaIngreso}
                                placeholder='Fecha de ingreso'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        fechaIngreso: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Antecedentes personales(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese los antecedentes personales del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            {/* text area  */}
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Antecedentes personales'
                                options={ANTECEDENTES_PERSONALES}
                                selectOnBlur={false}
                                value={requestFormFisio.antecedentesPersonales}
                                onChange={(event, { value }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        antecedentesPersonales: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div
                            className='container-input-deportivo-medioWidth'
                            style={{ width: 430 }}
                        >
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Diagnostico médico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardara el diagnostico médico del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-deportivo'
                                placeholder='Diagnostico médico'
                                type='text'
                                style={{ width: 430 }}
                                disabled={noEdit}
                                value={requestFormFisio.diagnosticoMedico}
                            ></textarea>
                        </div>
                        <div
                            className='container-input-deportivo-medioWidth'
                            style={{ width: 430 }}
                        >
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Recomendación médica (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Campo donde se guardará las recomendaciones realizadas al paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-deportivo'
                                placeholder='Recomendación médica'
                                type='text'
                                style={{ width: 430 }}
                                disabled={noEdit}
                                value={requestFormFisio.recomendacionMedica}
                            ></textarea>
                        </div>
                    </div>
                </div>
            )}

            {pagina === 2 && (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div
                            className='container-input-deportivo-medioWidth'
                            style={{ width: 430 }}
                        >
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Antecedentes familiares(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese los antecedentes familiares del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-deportivo'
                                placeholder='Diagnostico médico'
                                type='text'
                                style={{ width: 430 }}
                                value={requestFormFisio.antecedentesFamiliares}
                                placeholder='Antecedentes familiares'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        antecedentesFamiliares: value
                                    })
                                }
                            ></textarea>
                        </div>
                        <div
                            className='container-input-deportivo-medioWidth'
                            style={{ width: 430 }}
                        >
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Evaluación inicial (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese la evalución inicial sobre el paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-deportivo'
                                placeholder='Diagnostico médico'
                                type='text'
                                style={{ width: 430 }}
                                value={requestFormFisio.evaluacionInicial}
                                placeholder='Evaluación inicial'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        evaluacionInicial: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Estado de la piel (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese estado de la piel del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            {/* text area  */}
                            <input
                                className='input-form'
                                type='text'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.estadoPiel}
                                placeholder='Estado de la piel'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        estadoPiel: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Sensibilidad (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese nivel de sensibilidad del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            {/* text area  */}
                            <input
                                className='input-form'
                                type='text'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.sensibilidad}
                                placeholder='Sensibilidad'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        sensibilidad: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Dolor (<span className='isRequired'>*</span>
                                    )
                                </label>
                                <Tooltip
                                    text='Ingrese tipo de dolor que presenta el paciente.'
                                    icon='help circle'
                                />
                            </div>
                            {/* text area  */}
                            <input
                                className='input-form'
                                type='text'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.dolor}
                                placeholder='Dolor'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        dolor: value
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            )}

            {pagina === 3 && (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Arcos de movilidad(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese estado de los arcos de movilidad del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            {/* text area  */}
                            <input
                                className='input-form'
                                type='text'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.arcosMovilidad}
                                placeholder='Arcos de movilidad'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        arcosMovilidad: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Fuerza Muscular (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese diagnostico sobre la fuerza muscular del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            {/* text area  */}
                            <input
                                className='input-form'
                                type='text'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.fuerzaMuscular}
                                placeholder='Fuerza muscular'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        fuerzaMuscular: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Flexibilidad (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese diagnostico sobre la flexibilidad del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            {/* text area  */}
                            <input
                                className='input-form'
                                type='text'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.flexibilidad}
                                placeholder='Flexibilidad'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        flexibilidad: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Pruebas simiologicas (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese diagnostico sobre las pruebas simiologicas.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.pruebasSimiologicas}
                                placeholder='Pruebas simiologicas'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        pruebasSimiologicas: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Postura en marcha (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese diagnosticos de postura en marcha del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.posturaMarcha}
                                placeholder='Postura en marcha'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        posturaMarcha: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Cedula fisioterapeuta (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingresar el numero de documento del fisioterapeuta que atendió al paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                // disabled={noEdit}
                                value={requestFormFisio.cedulaFisioterapeuta}
                                placeholder='Cedeula fisioterapeuta'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        cedulaFisioterapeuta: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div
                            className='container-input-deportivo-medioWidth'
                            style={{ width: 430 }}
                        >
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Observaciones (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese observaciones sobre la consulta.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-deportivo'
                                type='text'
                                style={{ width: 430 }}
                                value={requestFormFisio.observaciones}
                                placeholder='Observaciones'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        observaciones: value
                                    })
                                }
                            ></textarea>
                        </div>
                        <div
                            className='container-input-deportivo-medioWidth'
                            style={{ width: 430 }}
                        >
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Plan Tratamiento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el plan de tratamiento que le recomienda al paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-deportivo'
                                type='text'
                                style={{ width: 430 }}
                                value={requestFormFisio.planTratamiento}
                                placeholder='Plan tratamiento'
                                onChange={({ target: { value } }) =>
                                    setRequestFormFisio({
                                        ...requestFormFisio,
                                        planTratamiento: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>
            )}
            <div className='container-pages-form'>
                <button
                    className='button-page'
                    style={{
                        background: `${pagina === 0 ? 'gray' : ''}`
                    }}
                    onClick={() => setPagina(0)}
                >
                    {`1`}
                </button>
                <button
                    className='button-page'
                    style={{
                        background: `${pagina === 1 ? 'gray' : ''}`
                    }}
                    onClick={() => setPagina(1)}
                >
                    {`2`}
                </button>
                <button
                    className='button-page'
                    style={{
                        background: `${pagina === 2 ? 'gray' : ''}`
                    }}
                    onClick={() => setPagina(2)}
                >
                    {`3`}
                </button>
                <button
                    className='button-page'
                    style={{
                        background: `${pagina === 3 ? 'gray' : ''}`
                    }}
                    onClick={() => setPagina(3)}
                >
                    {`4`}
                </button>
            </div>
            <div className='container-buttons-form'>
                <button
                    className='buttons-save-edit'
                    onClick={() => saveFormFisioterapia()}
                >
                    GUARDAR
                </button>
            </div>
            <div className='container-info-consult'>
                <button
                    className='button-info-personal'
                    onClick={() => consultaInfoPaciente()}
                >
                    CONSULTAR <i className='address card outline icon'></i>
                </button>
                <button
                    className='button-info-app'
                    onClick={() => setOpenInfoModal(true)}
                >
                    <i className='info icon'></i>
                </button>
            </div>
            {modalPaciente && (
                <ModalPacienteFisio setModalpaciente={setModalpaciente} />
            )}
            {openModalInfo && <InfoApp setOpenInfoModal={setOpenInfoModal} />}
        </div>
    );
};

export default FormFisioterapia;
