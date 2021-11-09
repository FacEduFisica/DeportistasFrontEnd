import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Tooltip from '../../../../common/tooltip';
import authService from '../../../../../services/authService';
import { Dropdown } from 'semantic-ui-react';
import { sweetAlert } from '../../../../actionsGlobals';
import { WARNING, BASE_URL, SUCCESS, ERROR} from '../../../../../constantGlobal';
import { MESSAGE_FIELD_REQUARED_GENERIC,
    GENEROS_VALIDOS,
    TIPO_DEPORTISTA_VALIDO,
    NIVEL_DEPORTIVO_VALIDO,
    CICLO_OLIMPICO_VALIDO,
    MESSAGE_SUCCESS_FORM,
    MESSAGE_NO_EDIT,
    RESPUESTA_DOBLE,
    MESSAGE_SUCCESS_FORM_EDIT,
    MESSAGE_FORM_SAVED } from '../../../../FormConstants/constants';

const SportsForm = ({userId}) => {
        // hook encargado de guardar la respuesta de la peticion
        const [isEditable, setIsEditable] = useState(false);

        // hook para deshabilitar los campos del form luego de guardarlo
        const [noEdit, setNoEdit] = useState(false);
    
        // hook para mostrar modal de para ver la definicion de deportistas
        const [showModalDefinition, setShowModalDefinition] = useState(false);
    
        // hook para abrir la modal para mostrar la infomarcion de la consulta
        const [modalConsulta, setModalConsulta] = useState(false);
    
        // hook que permite abrir la info de la app
        const [openModalInfo, setOpenInfoModal] = useState(false);
    
        // hook que habilita las tarjetas con las definiciones de los deportistas
        const [viewDefinitions, setViewDefinitions] = useState(false);
    
        // hook para guardar los datos personales, con la api de consulta
        const [requestConsulta, setRequestConsult] = useState({});
    
        // hook que habilita la modal para ver la difinicion de los tipos de deportistas
        const [viewModalDefinition, setViewModalDefinition] = useState(false);
    
        // hook donde se guarda la collection de disciplinas para mapearlos en el campo disiplinas deportivas
        const [collectionDisciplinas, setCollectionDisciplinas] = useState([]);
    
        // hooks para armar el objeto que requiere el api
        const [requestSport, setRequestSport] = useState({
            fechaInscripcion: '',
            disciplinaDeportiva: '',
            especialidad: '',
            genero: '',
            categorizacion: '',
            tipoDeportista: '',
            nivelDeportivo: '',
            cicloOlimpico: '',
            cicloOlimpicoActual: '',
            mayorLogroObtenido: ''
        });
    
        const obtenerDisciplinas = async () => {
            let token = authService.getToken();
            let objetcCollection = {
                key: '',
                text: '',
                value: ''
            };
            try {
                const response = await axios.get(
                    `${BASE_URL}/admin/disciplinas/obtenerdisciplinas?token=${token}`
                );
                console.log(response.data.disciplinas);
                if (response.data.codigo === '0000') {
                    const disciplinas = response.data.disciplinas.map(item =>
                        Object.assign({}, objetcCollection, {
                            key: item._id,
                            text: item.nombre,
                            value: item.nombre
                        })
                    );
                    setCollectionDisciplinas(...collectionDisciplinas, disciplinas);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        // useEffect, validaremos que el form ya este diligenciado y si se puede editar
        useEffect(() => {
            let token = authService.getToken();
            let id = authService.getUserId();
    
            obtenerDisciplinas();
    
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
                .catch(error => console.log(error));
    
            axios
                .get(`${BASE_URL}/user/datosdeportivos/${id}?token=${token}`)
                .then(response => {
                    const {
                        data: { codigo, datosDeportivos }
                    } = response;
                    if (codigo === '0000') {
                            setNoEdit(true);
                        setRequestSport(
                            Object.assign({}, requestSport, {
                                fechaInscripcion: datosDeportivos.fechaInscripcion,
                                disciplinaDeportiva:
                                    datosDeportivos.disciplinaDeportiva,
                                especialidad: datosDeportivos.especialidad,
                                genero: datosDeportivos.genero,
                                categorizacion: datosDeportivos.categorizacion,
                                tipoDeportista: datosDeportivos.tipoDeportista,
                                nivelDeportivo: datosDeportivos.nivelDeportivo,
                                cicloOlimpico: datosDeportivos.cicloOlimpico,
                                cicloOlimpicoActual:
                                    datosDeportivos.cicloOlimpicoActual,
                                mayorLogroObtenido:
                                    datosDeportivos.mayorLogroObtenido
                            })
                        );
                    }
                })
                .catch(error => console.log(error));
        }, []);
    
        // funcion para guardar el formulario y consumir el servicio
        const saveSportForm = async () => {
            const values = Object.values(requestSport);
            const valuesValidate = values.filter(item => item !== '');
    
            if (noEdit) {
                sweetAlert(WARNING, 'Atención', MESSAGE_FORM_SAVED);
            } else {
                if (valuesValidate.length === 10) {
                    let token = authService.getToken();
                    let id = authService.getUserId();
    
                        try {
                            const response = await axios.put(
                                `${BASE_URL}/admin/users/modificarusuario/datosdeportivos/${userId}?token=${token}`,
                                requestSport
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
                    sweetAlert(WARNING, 'Atención', MESSAGE_FIELD_REQUARED_GENERIC);
                }
            }
        };
    
        // funcion para habilitar la edicion del formulario
        const editSportForm = () => {
            if (noEdit) {
                    setNoEdit(false);
                    sweetAlert(
                        SUCCESS,
                        '¡Éxito!',
                        'Puede proceder a editar su formulario acádemico y guardarlo, asegurese de diligenciar el formulario de manera correcta.'
                    );

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
                    `${BASE_URL}/user/datosdeportivos/${id}?token=${token}`
                );
    
                if (response.data.codigo === '0000') {
                    const {
                        data: { datosDeportivos }
                    } = response;
                    setRequestConsult(
                        Object.assign({}, requestConsulta, datosDeportivos)
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
        <div className='container-form-sgdar from-modal'>
        <div className='form-sgdar'>
            <div className='container-row-form'>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Fecha de inscripción (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Seleccione fecha de inscripción.' icon="help circle"/>
                    </div>
                    <input
                        type='date'
                        className='input-form'
                        required
                        disabled={noEdit}
                        placeholder='dd/mm/aaaa'
                        value={requestSport.fechaInscripcion}
                        onChange={({ target: { value } }) =>
                            setRequestSport({
                                ...requestSport,
                                fechaInscripcion: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Género (<span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Seleccione el genero al cual pertenece.' icon="help circle"/>
                    </div>
                    <Dropdown
                        className='input-dropdown'
                        placeholder='Género'
                        required
                        disabled={noEdit}
                        value={requestSport.genero}
                        selection
                        options={GENEROS_VALIDOS}
                        selectOnBlur={false}
                        onChange={(event, { value }) =>
                            setRequestSport({
                                ...requestSport,
                                genero: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Disciplina deportiva (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese la disciplina deportiva que practica.' icon="help circle"/>
                    </div>
                    <Dropdown
                        className='input-dropdown'
                        placeholder='Disciplina deportiva'
                        required
                        disabled={noEdit}
                        value={requestSport.disciplinaDeportiva}
                        selection
                        options={collectionDisciplinas}
                        selectOnBlur={false}
                        onChange={(event, { value }) =>
                            setRequestSport({
                                ...requestSport,
                                disciplinaDeportiva: value
                            })
                        }
                    />
                </div>
            </div>
            <div className='container-row-form'>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Especialidad deportiva (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese la especialidad deportiva a la cual pertenece.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        type='text'
                        placeholder='Especialidad deportiva'
                        required
                        disabled={noEdit}
                        value={requestSport.especialidad}
                        onChange={({ target: { value } }) =>
                            setRequestSport({
                                ...requestSport,
                                especialidad: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Categorización (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese su categorizacion' icon="help circle"/>
                    </div>
                    <input
                        type='text'
                        className='input-form'
                        placeholder='Categorizacion'
                        required
                        disabled={noEdit}
                        value={requestSport.categorizacion}
                        onChange={({ target: { value } }) =>
                            setRequestSport({
                                ...requestSport,
                                categorizacion: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Tipo deportista (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Seleccione el tipo de deportista en el cual se encuentra.' icon="help circle"/>
                    </div>
                    <Dropdown
                        className='input-dropdown'
                        placeholder='Tipo de deportista'
                        required
                        disabled={noEdit}
                        value={requestSport.tipoDeportista}
                        selection
                        options={TIPO_DEPORTISTA_VALIDO}
                        selectOnBlur={false}
                        onFocus={() =>
                            showModalDefinition
                                ? () => {}
                                : setViewModalDefinition(true)
                        }
                        onChange={(event, { value }) =>
                            setRequestSport({
                                ...requestSport,
                                tipoDeportista: value
                            })
                        }
                    />
                    {/* {viewModalDefinition && (
                        <ModalViewDefinition
                            setShowModalDefinition={setShowModalDefinition}
                            setViewDefinitions={setViewDefinitions}
                            setViewModalDefinition={setViewModalDefinition}
                        />
                    )}
                    {viewDefinitions && (
                        <TiposDeportistasDefinicion
                            setViewDefinitions={setViewDefinitions}
                        />
                    )} */}
                </div>
            </div>
            <div className='container-row-form'>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Nivel deportivo (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Seleccione el nivel deportivo en el cual se encuentra.' icon="help circle"/>
                    </div>
                    <Dropdown
                        className='input-dropdown'
                        placeholder='Nivel deportivo'
                        required
                        disabled={noEdit}
                        value={requestSport.nivelDeportivo}
                        selection
                        options={NIVEL_DEPORTIVO_VALIDO}
                        selectOnBlur={false}
                        onChange={(event, { value }) =>
                            setRequestSport({
                                ...requestSport,
                                nivelDeportivo: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Nivel Olímpico (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Seleccione si pertenece o no a un nivel olímpico' icon="help circle"/>
                    </div>
                    <Dropdown
                        className='input-dropdown'
                        placeholder='Nivel olímpico'
                        required
                        value={requestSport.cicloOlimpico}
                        selection
                        disabled={noEdit}
                        options={RESPUESTA_DOBLE}
                        selectOnBlur={false}
                        onChange={(event, { value }) =>
                            setRequestSport({
                                ...requestSport,
                                cicloOlimpico: value,
                                cicloOlimpicoActual:
                                    value === 'NO' ? 'NO-APLICA' : ''
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    {requestSport.cicloOlimpico === 'SI' ? (
                        <div>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Nivel Olímpico actual (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip text='Seleccione el ciclo olímpico en el cual se encuentra.' icon="help circle"/>
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                placeholder='Nivel olímpico actual'
                                required
                                disabled={noEdit}
                                value={requestSport.cicloOlimpicoActual}
                                selection
                                options={CICLO_OLIMPICO_VALIDO}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestSport({
                                        ...requestSport,
                                        cicloOlimpicoActual: value
                                    })
                                }
                            />
                        </div>
                    ) : null}
                </div>
            </div>
            <div className='container-row-form'>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Mayor logro obtenido (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese los logros obtenidos durante su ciclo deportivo' icon="help circle"/>
                    </div>
                    <textarea
                        className='textarea-form'
                        disabled={noEdit}
                        placeholder='Mayor logro obtenido'
                        value={requestSport.mayorLogroObtenido}
                        onChange={({ target: { value } }) =>
                            setRequestSport({
                                ...requestSport,
                                mayorLogroObtenido: value
                            })
                        }
                    ></textarea>
                </div>
            </div>
        </div>
        <div className='container-buttons-form'>
            <button
                className='buttons-save-edit'
                onClick={() => saveSportForm()}
            >
                GUARDAR
            </button>
            {/* Boton editar solo cuando el admin lo permita probar ese servicio*/}
            <button
                className='buttons-save-edit'
                onClick={() => editSportForm()}
            >
                EDITAR
            </button>
        </div>
    </div>
     );
}
 
export default SportsForm;
