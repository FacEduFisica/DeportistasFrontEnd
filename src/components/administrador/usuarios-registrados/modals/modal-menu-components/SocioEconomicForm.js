import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Tooltip from '../../../../common/tooltip';
import authService from '../../../../../services/authService';
import { sweetAlert } from '../../../../actionsGlobals';
import { WARNING, BASE_URL, SUCCESS, ERROR } from '../../../../../constantGlobal';
import { MESSAGE_FIELD_REQUARED_GENERIC,
    MESSAGE_SUCCESS_FORM,
    MESSAGE_NO_EDIT,
    MESSAGE_SUCCESS_FORM_EDIT,
    MESSAGE_FORM_SAVED } from '../../../../FormConstants/constants';

const SocioEconomicForm = ({userId}) => {
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

    // hook para validar si ya se guardo el formulario.
    const [formSave, setFormSave] = useState(false);

    // hook para capturar la respuestas del formulario y armar el request para el servicio
    const [requestSocioeconomic, setRequestSocioeconomic] = useState({
        pais: '',
        departamento: '',
        municipio: '',
        barrio: '',
        direccion: '',
        estrato: '',
        telefono: '',
        celular: '',
        correo: ''
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
            .catch(error => console.log(error));

        axios
            .get(`${BASE_URL}/user/datosresidencia/${userId}?token=${token}`)
            .then(response => {
                const {
                    data: { codigo, datosSocioeconomicos }
                } = response;
                if (codigo === '0000') {
                        setNoEdit(true);
                    setRequestSocioeconomic(
                        Object.assign({}, requestSocioeconomic, {
                            pais: datosSocioeconomicos.pais,
                            departamento: datosSocioeconomicos.departamento,
                            municipio: datosSocioeconomicos.municipio,
                            barrio: datosSocioeconomicos.barrio,
                            direccion: datosSocioeconomicos.direccion,
                            estrato: datosSocioeconomicos.estrato,
                            telefono: datosSocioeconomicos.telefono,
                            celular: datosSocioeconomicos.celular,
                            correo: datosSocioeconomicos.correo
                        })
                    );
                }
            })
            .catch(error => console.log(error));
    }, []);

    // funcion para guardar el furmulario y enviarlo al servicio registrar datos socioeconomicos
    const saveSocioeconomicForm = async () => {
        const values = Object.values(requestSocioeconomic);
        const valuesValidate = values.filter(item => item !== '');

        if (noEdit) {
            sweetAlert(WARNING, 'Atención', 'Para poder guardar debe habilitar el fomulario, haciendo clic en el botón editar.');
        } else {
            if (valuesValidate.length === 9) {
                let token = authService.getToken();
                let id = authService.getUserId();

                    try {
                        const response = await axios.put(
                            `${BASE_URL}/admin/users/modificarusuario/datosresidencia/${userId}?token=${token}`,
                            requestSocioeconomic
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

    // funcion que permite editar el formulario. habilita el formulario.
    const editSocioeconomicForm = () => {
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
                `${BASE_URL}admin/users/modificarusuario/datosresidencia/${userId}?token=${token}`
            );

            if (response.data.codigo === '0000') {
                const {
                    data: { datosSocioeconomicos }
                } = response;
                setRequestConsult(
                    Object.assign({}, requestConsulta, datosSocioeconomicos)
                );
                setModalConsulta(true);
            } else {
                sweetAlert(
                    ERROR,
                    'Error',
                    'Ocurrio un error con la consulta de los datos.'
                );
            }
        } catch (error) {}
    };
    return ( 
        <div className='container-form-sgdar from-modal'>
        <div className='form-sgdar'>
            <div className='container-row-form'>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            País (<span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese país en el cual se encuentra.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='text'
                        placeholder='País'
                        value={requestSocioeconomic.pais}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                pais: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Departamento (
                            <span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese departamento en el cual se encuentra.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='text'
                        placeholder='Departamento'
                        value={requestSocioeconomic.departamento}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                departamento: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Municipio (<span className='isRequired'>*</span>
                            )
                        </label>
                        <Tooltip text='Ingrese municipio en el cual se encuentra.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='text'
                        placeholder='Municipio'
                        value={requestSocioeconomic.municipio}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                municipio: value
                            })
                        }
                    />
                </div>
            </div>
            <div className='container-row-form'>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Barrio (<span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese barrio en el cual se encuentra.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='text'
                        placeholder='Barrio'
                        value={requestSocioeconomic.barrio}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                barrio: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Dirección (<span className='isRequired'>*</span>
                            )
                        </label>
                        <Tooltip text='Ingrese la direccion de su residencia.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='text'
                        placeholder='Dirección'
                        value={requestSocioeconomic.direccion}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                direccion: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Estrato (<span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese el estrato de su residencia.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='number'
                        placeholder='Estrato'
                        value={requestSocioeconomic.estrato}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                estrato: value
                            })
                        }
                    />
                </div>
            </div>
            <div className='container-row-form'>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Teléfono (<span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese el teléfono de su residencia.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='number'
                        placeholder='Teléfono'
                        value={requestSocioeconomic.telefono}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                telefono: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Celular (<span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese el número de su celular.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='number'
                        placeholder='Celular'
                        value={requestSocioeconomic.celular}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                celular: value
                            })
                        }
                    />
                </div>
                <div className='container-input'>
                    <div className='container-label'>
                        <label className='label-fomr' htmlFor=''>
                            Correo (<span className='isRequired'>*</span>)
                        </label>
                        <Tooltip text='Ingrese su correo electronico.' icon="help circle"/>
                    </div>
                    <input
                        className='input-form'
                        required
                        disabled={noEdit}
                        type='email'
                        placeholder='Correo'
                        value={requestSocioeconomic.correo}
                        onChange={({ target: { value } }) =>
                            setRequestSocioeconomic({
                                ...requestSocioeconomic,
                                correo: value
                            })
                        }
                    />
                </div>
            </div>
        </div>
        <div className='container-buttons-form'>
            <button
                className='buttons-save-edit'
                onClick={saveSocioeconomicForm}
            >
                GUARDAR
            </button>
            <button
                className='buttons-save-edit'
                onClick={editSocioeconomicForm}
            >
                EDITAR
            </button>
        </div>
        {/* <div className='container-info-consult'>
            <button
                className='button-info-personal'
                onClick={() => consultaInfo()}
            >
                CONSULTAR <i className='address card outline icon'></i>
            </button>
            {modalConsulta && (
                <ConsultaDatosSocioeconomicos
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
        {openModalInfo && <InfoApp setOpenInfoModal={setOpenInfoModal} />} */}
    </div>
     );
}
 
export default SocioEconomicForm;