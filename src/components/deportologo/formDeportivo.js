import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tooltip from '../common/tooltip';
import InfoApp from '../common/infoApp';
import { Dropdown } from 'semantic-ui-react';
import { sweetAlert } from '../actionsGlobals';
import { BASE_URL, SUCCESS, WARNING, ERROR } from '../../constantGlobal';
import {
    POSITIVO_NEGATIVO,
    MESSAGE_FIELD_DEPORTOLOGOS,
    MESSAGE_ERROR_SERVER,
    RESET_FORM_DEPORTOLOGO,
    MESSAGE_NOFOUND_STUDENT
} from '../FormConstants/constants';

import '../FormConstants/formsStyles.css';
import './formDeportivo.css';
import authService from '../../services/authService';
import ModalPaciente from './Paciente/ModalPaciente';

const FormDeportivo = () => {
    // hook que permite abrir la info de la app
    const [openModalInfo, setOpenInfoModal] = useState(false);

    // hook paginador formulario deportologo
    const [pagina, setPagina] = useState(0);

    // hook para guardar la cedula del paciente
    const [cedulaPaciente, setCedulaPaciente] = useState('');

    // hook para guardar el id del estudiante que se consulta
    const [idPaciente, setIdPaciente] = useState('');

    // hook para guardar el id del deportologo
    const [idDeportologo, setIdDeportologo] = useState('');

    // hook que controla la modal en donde se consulta la informacion del paciente.
    const [modalPaciente, setModalpaciente] = useState(false);

    // hook para capturar el la informacion del formulario para armar el request de la api
    const [requestFormDeportologo, setRequestFormDeportologo] = useState({
        deportistaId: '',
        deportologoId: '',
        responsable: '',
        telefonoResponsable: '',
        parentesco: '',
        acompanante: '',
        telefonoAcompanante: '',
        motivoConsulta: '',
        sistemaCabezaCuello: '',
        sistemaOftalmologico: '',
        sistemaOtorrino: '',
        sistemaMaxilofacial: '',
        sistemaPulmonar: '',
        sistemaAbdomen: '',
        sistemaUrinario: '',
        sistemaMusculoEsqueletico: '',
        sistemaPiel: '',
        sistemaHematologico: '',
        sistemaMetabolico: '',
        sistemaNeurologico: '',
        sistemaVascular: '',
        sistemaOtros: '',
        sistemaObservaciones: '',
        antecedenteCardioTabaquismo: '',
        antecedenteCardioTabaquismoCantidad: '',
        antecedenteCardioDislipidemia: '',
        antecedenteCardioSedentario: '',
        antecedenteCardioObesidad: '',
        antecedenteCardioHipertension: '',
        antecedenteCardioCoronaria: '',
        antecedenteCardioSoplo: '',
        antecedenteCardioArritmia: '',
        antecedenteCardioDiabetes: '',
        antecedenteCardioOtros: '',
        antecedenteCardioObservaciones: '',
        antecedenteDeporDesmayo: '',
        antecedenteDeporProblemaEjercicio: '',
        antecedenteDeporCardio: '',
        antecedenteDeporPulmonar: '',
        antecedenteDeporLesion: '',
        antecedenteDeporOtros: '',
        antecedenteDeporObservaciones: '',
        antecedenteGralMedicamento: '',
        antecedenteGralAlergia: '',
        antecedenteFamiliares: '',
        antecedenteGineco: '',
        examenFisico: '',
        antropometriaPeso: '',
        antropometriaTalla: '',
        antropometriaCalificacion: '',
        antropometriaImc: '',
        antropometriaPesoImc: '',
        frecuenciaCardiacaReposo: '',
        presionArterialSistolica: '',
        presionArterialDiastolica: '',
        riesgoFramiPorcentaje: '',
        riesgoFramiCalificacion: '',
        cabezaCuello: '',
        cardiopulmonar: '',
        abdomen: '',
        osteoMuscular: '',
        vascularPeriferico: '',
        pielAnexos: '',
        postura: '',
        flexibilidad: '',
        fuerza: '',
        diagnostico: '',
        opinionPlan: '',
        cedulaDeportologo: ''
    });

    // useEffect se realizar para que apenas se monte el componente, coger el id del deportologo
    useEffect(() => {
        let id = authService.getUserId();
        setIdDeportologo(id);
        setRequestFormDeportologo({
            ...requestFormDeportologo,
            deportologoId: id
        });
    }, []);

    // funcion que permite abrir la modal para consultar la informacion del paciente.
    const consultaInfoPaciente = () => {
        setModalpaciente(true);
    };

    // funcion para obtener el id del estudainte apenas se llena el campo
    const buscarIdEstudiante = async () => {
        if (cedulaPaciente) {
            try {
                let token = authService.getToken();

                const response = await axios.get(
                    `${BASE_URL}/deportologo/obtenerdatos/${cedulaPaciente}?token=${token}`
                );

                if (response.data.codigo === '0000') {
                    setIdPaciente(response.data.datosConsultaDeportologo._id);
                    setRequestFormDeportologo({
                        ...requestFormDeportologo,
                        deportistaId: response.data.datosConsultaDeportologo._id
                    });
                } else if (response.data.codigo === '0011') {
                    sweetAlert(
                        ERROR,
                        'Error',
                        'El usuairo que intenta buscar no esta registrado en la aplicación'
                    );
                } else if (response.data.codigo === '0004') {
                    sweetAlert(WARNING, 'Atención', MESSAGE_NOFOUND_STUDENT);
                } else {
                    sweetAlert(
                        WARNING,
                        'Atención',
                        'Es necesario ingrsar el documento del paciente para buscar sus datos.'
                    );
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            sweetAlert(
                WARNING,
                '¡Atención!',
                'Es necesario la cedula del paciente para realizar el informe clinico'
            );
        }
    };

    // funcion para fuardar el formulaerio del deportologo
    const saveFormDeportologo = async () => {
        const values = Object.values(requestFormDeportologo);
        const validateValues = values.filter(item => item !== '');

        if (
            validateValues.length === 69 ||
            validateValues.length === 67 ||
            validateValues.length === 68
        ) {
            try {
                let token = authService.getToken();
                let id = authService.getUserId();

                const response = await axios.post(
                    `${BASE_URL}/deportologo/registrardatos/${id}/${idPaciente}?token=${token}`,
                    requestFormDeportologo
                );

                if (response.data.codigo === '0000') {
                    sweetAlert(
                        SUCCESS,
                        '¡Éxito!',
                        'Se ha guardado exitosamente las consulta'
                    );
                    setRequestFormDeportologo(
                        Object.assign(
                            {},
                            requestFormDeportologo,
                            RESET_FORM_DEPORTOLOGO
                        )
                    );
                    setCedulaPaciente('');
                    setPagina(0);
                } else {
                    sweetAlert(ERROR, 'Error', MESSAGE_ERROR_SERVER);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            sweetAlert(WARNING, '!Atención!', MESSAGE_FIELD_DEPORTOLOGOS);
        }
    };

    return (
        <div className='container-form-sgdar'>
            <h1 className='title-form'>Formulario deportivo</h1>
            {pagina === 0 ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Cedula del paciente (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese la cedula del paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                value={cedulaPaciente}
                                onBlur={() => buscarIdEstudiante()}
                                placeholder='Cedula'
                                onChange={({ target: { value } }) =>
                                    setCedulaPaciente(value)
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Responsable (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el nombre de la persona responsable por el paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                placeholder='Responsable'
                                value={requestFormDeportologo.responsable}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        responsable: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Teléfono del responsable (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el numero teléfonico del responsable del paciente'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                placeholder='Teléfono del responsable'
                                value={
                                    requestFormDeportologo.telefonoResponsable
                                }
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        telefonoResponsable: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Parentesco (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el parentesco del responsable respecto al paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                placeholder='Parentesco'
                                value={requestFormDeportologo.parentesco}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        parentesco: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Acompañante (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el nombre de la persona encargada de acompañar el paciente.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                placeholder='Acompañante'
                                value={requestFormDeportologo.acompanante}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        acompanante: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Teléfono del acompañante (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el numero teléfonico del acompañante del paciente'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                placeholder='Teléfono del acompañante'
                                value={
                                    requestFormDeportologo.telefonoAcompanante
                                }
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        telefonoAcompanante: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Motivo de la consulta (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el el motivo por el cual el paciente solicito la consulta.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-deportivo'
                                placeholder='Ingrese motivo de la consulta'
                                value={requestFormDeportologo.motivoConsulta}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        motivoConsulta: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : null}
            {pagina === 1 ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Cabeza y cuello (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Cabeza y cuello'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.sistemaCabezaCuello
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaCabezaCuello: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Oftalmológico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Oftalmológico'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.sistemaOftalmologico
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaOftalmologico: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Otorrinolaringológico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Otorrinolaringológico'
                                options={POSITIVO_NEGATIVO}
                                value={requestFormDeportologo.sistemaOtorrino}
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaOtorrino: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Maxilofacial (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Maxilofacial'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.sistemaMaxilofacial
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaMaxilofacial: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Pulmonar (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Pulmonar'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={requestFormDeportologo.sistemaPulmonar}
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaPulmonar: value
                                    })
                                }
                            />
                        </div>
                        <div
                            className='container-input-deportivo'
                            style={{ width: '280px' }}
                        >
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Abdomen / gastrointestinal (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Abdomen / gastrointestinal'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={requestFormDeportologo.sistemaAbdomen}
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaAbdomen: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Genitourinario (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Genitourinario'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={requestFormDeportologo.sistemaUrinario}
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaUrinario: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Músculo esqueletico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Músculo esqueletico'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.sistemaMusculoEsqueletico
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaMusculoEsqueletico: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Piel y tegidos blandos (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Piel y tegidos blandos'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={requestFormDeportologo.sistemaPiel}
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaPiel: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Hematológicos (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Hematológicos'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.sistemaHematologico
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaHematologico: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Metabólico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Metabólico'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={requestFormDeportologo.sistemaMetabolico}
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaMetabolico: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Neurológico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Neurológico'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.sistemaNeurologico
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaNeurologico: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Vascular periférico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Vascular periférico'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={requestFormDeportologo.sistemaVascular}
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaVascular: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Otros (<span className='isRequired'>*</span>
                                    )
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Otros'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={requestFormDeportologo.sistemaOtros}
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaOtros: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div
                                className='container-label'
                                style={{ width: 180 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Observaciones(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese las observaciones referentes a la consulta.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-sistema-obvservaciones'
                                placeholder='Ingrese observaciones.'
                                value={
                                    requestFormDeportologo.sistemaObservaciones
                                }
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        sistemaObservaciones: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : null}
            {pagina === 2 ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Tabaquismo (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Tabaquismo'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioTabaquismo
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioTabaquismo: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Tabaquismo cantidad
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                selection
                                placeholder='Tabaquismo cantidad'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioTabaquismoCantidad
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioTabaquismoCantidad: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Dislipidemia (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Dislipidemia'
                                options={POSITIVO_NEGATIVO}
                                value={
                                    requestFormDeportologo.antecedenteCardioDislipidemia
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioDislipidemia: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Sendentario (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Sedentario'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioSedentario
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioSedentario: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Obesidad (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Obesidad'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioObesidad
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioObesidad: value
                                    })
                                }
                            />
                        </div>
                        <div
                            className='container-input-deportivo'
                            style={{ width: '280px' }}
                        >
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Hipertencion arterial (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Hipertencion arterial'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioHipertension
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioHipertension: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div
                                className='container-label'
                                style={{ width: 250 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Enfermedad coronaria (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                style={{ width: 250 }}
                                required
                                selection
                                placeholder='Enfermedad coronaria'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioCoronaria
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioCoronaria: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Soplos(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Soplos'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioSoplo
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioSoplo: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Arritmia (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Arritmia'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioArritmia
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioArritmia: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Diabetes (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Hematológicos'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioDiabetes
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioDiabetes: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Otros (<span className='isRequired'>*</span>
                                    )
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                placeholder='Otos'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteCardioOtros
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioOtros: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Observaciones
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-cardio-obvservaciones'
                                placeholder='Ingrese observaciones.'
                                value={
                                    requestFormDeportologo.antecedenteCardioObservaciones
                                }
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteCardioObservaciones: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : null}
            {pagina === 3 ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Desmayos o dolor torático con el ejercicio (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                style={{ width: 400 }}
                                selection
                                placeholder='Desmayos o dolor'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteDeporDesmayo
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteDeporDesmayo: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Problemas asociados al ejercicio (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                style={{ width: 400 }}
                                selection
                                placeholder='Problemas asociados al ejercicio'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteDeporProblemaEjercicio
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteDeporProblemaEjercicio: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Problemas cardiovasculares con el ejercicio
                                    (<span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                style={{ width: 400 }}
                                selection
                                placeholder='Problemas cardiovasculares'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteDeporCardio
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteDeporCardio: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Problemas pulmonares con el ejercicio (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                style={{ width: 400 }}
                                selection
                                placeholder=' Problemas pulmonares'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteDeporPulmonar
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteDeporPulmonar: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Lesiones recientes o antiguas (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                style={{ width: 400 }}
                                selection
                                placeholder='Lesiones'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteDeporLesion
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteDeporLesion: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Problemas relacionados con la actividad
                                    fisica(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                style={{ width: 400 }}
                                selection
                                placeholder='Otros problemas'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteDeporOtros
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteDeporOtros: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Observaciones(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese las observaciones referentes a los antecedentes deportivos.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-cardio-obvservaciones'
                                placeholder='Ingrese observaciones.'
                                value={
                                    requestFormDeportologo.antecedenteDeporObservaciones
                                }
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteDeporObservaciones: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : null}
            {pagina === 4 ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Medicamentos que ingiera regularmente (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                style={{ width: 400 }}
                                selection
                                placeholder='Medicamentos que ingiera regularmente'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteGralMedicamento
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteGralMedicamento: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Alergia a algun medicamento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese positivo o negativo segun sea el caso.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                style={{ width: 400 }}
                                selection
                                placeholder='Alergia a algun medicamento'
                                options={POSITIVO_NEGATIVO}
                                selectOnBlur={false}
                                value={
                                    requestFormDeportologo.antecedenteGralAlergia
                                }
                                onChange={(event, { value }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteGralAlergia: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Antecendentes familiares (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese los antecendentes medicos familiares.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones'
                                placeholder='Ingrese los antecendentes medicos familiares.'
                                value={
                                    requestFormDeportologo.antecedenteFamiliares
                                }
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteFamiliares: value
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Antecedentes gineco-obstétricos (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese los antecedentes gineco-obstétricos.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones'
                                placeholder='Ingrese antecedentes gineco-obstétricos.'
                                value={requestFormDeportologo.antecedenteGineco}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antecedenteGineco: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Examen físico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusiones sobre el examen físico.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones'
                                placeholder='Ingrese conclusiones examen físico.'
                                value={requestFormDeportologo.examenFisico}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        examenFisico: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : null}
            {pagina === 5 ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Antropometria peso (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el peso'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                value={requestFormDeportologo.antropometriaPeso}
                                placeholder='Peso'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antropometriaPeso: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Antropometria talla (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el talla'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                value={
                                    requestFormDeportologo.antropometriaTalla
                                }
                                placeholder='Talla'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antropometriaTalla: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Antropometria Calificación (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el Calificación'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                value={
                                    requestFormDeportologo.antropometriaCalificacion
                                }
                                placeholder='Calificación'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antropometriaCalificacion: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Antropometria IMC (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el IMC'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                value={requestFormDeportologo.antropometriaImc}
                                placeholder='IMC'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antropometriaImc: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Peso IMC (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese peso IMC.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                required
                                type='number'
                                value={
                                    requestFormDeportologo.antropometriaPesoImc
                                }
                                placeholder='Peso IMC'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        antropometriaPesoImc: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Frecuencia cardiaca reposo (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese frecuencia cardiaca en reposo.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                required
                                type='number'
                                value={
                                    requestFormDeportologo.frecuenciaCardiacaReposo
                                }
                                placeholder='Frecuencia cardiaca-reposo'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        frecuenciaCardiacaReposo: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Frecuecia arterial sistólica (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese frecuencia arterial sistólica.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                value={
                                    requestFormDeportologo.presionArterialSistolica
                                }
                                required
                                placeholder='Frecuencia arterial-sistólica'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        presionArterialSistolica: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Presión arterial diastólica(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese presión arterial diastólica.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                value={
                                    requestFormDeportologo.presionArterialDiastolica
                                }
                                placeholder='Presión arterial diastólica'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        presionArterialDiastolica: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Riesgo Framingham porcentaje (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese riesgo Framingham porcentaje.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                value={
                                    requestFormDeportologo.riesgoFramiPorcentaje
                                }
                                placeholder='porcentaje'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        riesgoFramiPorcentaje: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Riesgo Framingham porcentaje (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese riesgo Framingham porcentaje.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                value={
                                    requestFormDeportologo.riesgoFramiCalificacion
                                }
                                placeholder='porcentaje'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        riesgoFramiCalificacion: value
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            ) : null}
            {pagina === 6 ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Cabeza y cuello (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusiones de cabeza y cuello.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones2'
                                placeholder='Conclusiones cabeza y cuello.'
                                value={requestFormDeportologo.cabezaCuello}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        cabezaCuello: value
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Cardiopulmonar (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusioes cardiopulmonares.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones2'
                                placeholder='conclusiones cardiopulmonares.'
                                value={requestFormDeportologo.cardiopulmonar}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        cardiopulmonar: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Abdomen (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusiones abdominales.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones2'
                                placeholder='Conclusiones abdomen.'
                                value={requestFormDeportologo.abdomen}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        abdomen: value
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Osteomuscular (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conlusiones osteomusculares.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones2'
                                placeholder='Conclusión osteomuscular'
                                value={requestFormDeportologo.osteoMuscular}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        osteoMuscular: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Vascular periférico (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusión vascular perfiférico.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones2'
                                placeholder='Conclusión vascular periférico.'
                                value={
                                    requestFormDeportologo.vascularPeriferico
                                }
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        vascularPeriferico: value
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Piel anexos(
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusión piel anexos.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones2'
                                placeholder='Conclusión piel anexos.'
                                value={requestFormDeportologo.pielAnexos}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        pielAnexos: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Postura (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusión postura.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones2'
                                placeholder='Conclusión postura.'
                                value={requestFormDeportologo.postura}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        postura: value
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Flexibilidad (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusión Flexibilidad.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones2'
                                placeholder='Conclusión flexibilidad.'
                                value={requestFormDeportologo.flexibilidad}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        flexibilidad: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : null}
            {pagina === 7 ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Fuerza (tren superior e inferior) (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusiones de fuerza.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones'
                                placeholder='Conclusiones fuerza tren superior e inferior.'
                                value={requestFormDeportologo.fuerza}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        fuerza: value
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Diagnostico general (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese conclusioes generales.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones'
                                placeholder='Diagnostico.'
                                value={requestFormDeportologo.diagnostico}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        diagnostico: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input-deportivo-medioWidth'>
                            <div
                                className='container-label'
                                style={{ width: 400 }}
                            >
                                <label className='label-fomr' htmlFor=''>
                                    Opinión y plan (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese opinones y plan a seguir.'
                                    icon='help circle'
                                />
                            </div>
                            <textarea
                                className='textarea-form-conclusiones'
                                placeholder='Opiniones y plan a seguir.'
                                value={requestFormDeportologo.opinionPlan}
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        opinionPlan: value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Cedula del deportologo (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingresar cedula del deportologo.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                value={requestFormDeportologo.cedulaDeportologo}
                                placeholder='Número de documento'
                                onChange={({ target: { value } }) =>
                                    setRequestFormDeportologo({
                                        ...requestFormDeportologo,
                                        cedulaDeportologo: value
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            ) : null}
            <div className='container-pages-form'>
                <button
                    className='button-page'
                    style={{ background: `${pagina === 0 ? 'gray' : ''}` }}
                    onClick={() => setPagina(0)}
                >
                    {`1`}
                </button>
                <button
                    className='button-page'
                    style={{ background: `${pagina === 1 ? 'gray' : ''}` }}
                    onClick={() => setPagina(1)}
                >
                    {`2`}
                </button>
                <button
                    className='button-page'
                    style={{ background: `${pagina === 2 ? 'gray' : ''}` }}
                    onClick={() => setPagina(2)}
                >
                    {`3`}
                </button>
                <button
                    className='button-page'
                    style={{ background: `${pagina === 3 ? 'gray' : ''}` }}
                    onClick={() => setPagina(3)}
                >
                    {`4`}
                </button>
                <button
                    className='button-page'
                    style={{ background: `${pagina === 4 ? 'gray' : ''}` }}
                    onClick={() => setPagina(4)}
                >
                    {`5`}
                </button>
                <button
                    className='button-page'
                    style={{ background: `${pagina === 5 ? 'gray' : ''}` }}
                    onClick={() => setPagina(5)}
                >
                    {`6`}
                </button>
                <button
                    className='button-page'
                    style={{ background: `${pagina === 6 ? 'gray' : ''}` }}
                    onClick={() => setPagina(6)}
                >
                    {`7`}
                </button>
                <button
                    className='button-page'
                    style={{ background: `${pagina === 7 ? 'gray' : ''}` }}
                    onClick={() => setPagina(7)}
                >
                    {`8`}
                </button>
            </div>
            <div className='container-buttons-form'>
                <button
                    className='buttons-save-edit'
                    onClick={() => saveFormDeportologo()}
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
                <ModalPaciente setModalpaciente={setModalpaciente} />
            )}
            {openModalInfo && <InfoApp setOpenInfoModal={setOpenInfoModal} />}
        </div>
    );
};

export default FormDeportivo;
