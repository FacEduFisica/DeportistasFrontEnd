import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authService from '../../../../../services/authService';
import {
    BASE_URL,
    SUCCESS,
    WARNING,
    ERROR
} from '../../../../../constantGlobal';
import { Dropdown } from 'semantic-ui-react';
import { sweetAlert } from '../../../../actionsGlobals';
import {
    TIPO_DOCUMENTO_OPTIONS,
    ESTADO_CIVIL_OPTIONS,
    SEXO_OPTIONS,
    SEGURIDAD_SOCIAL_OPTIONS,
    GRUPO_SANGUINEO_OPTIONS,
    TIPO_DISCAPACIDAD_OPTIONS,
    ETNIA_OPTIONS,
    RESPUESTA_DOBLE,
    MESSAGE_FIELD_REQUARED,
    MESSAGE_SUCCESS_FORM,
    MESSAGE_NO_EDIT,
    MESSAGE_FORM_SAVED,
    MESSAGE_SUCCESS_FORM_EDIT
} from '../../../../FormConstants/constants';
import Tooltip from '../../../../common/tooltip';

const AcademicForm = ({userId}) => {
    // hook terminos y condiciones
    const [swTerminosCondiciones, setTerminosCondiciones] = useState(false);

    // hook encargado de guardar la respuesta de la peticion
    const [isEditable, setIsEditable] = useState(false);

    // hook para deshabilitar los campos del form luego de guardarlo
    const [noEdit, setNoEdit] = useState(true);

    // swForm variable que muestra los dos form, true la primera parte, false la segunda parte.
    const [swForm, setSwForm] = useState(true);

    // hook que permite abrir la info de la app
    const [openModalInfo, setOpenInfoModal] = useState(false);

    // hook para abrir la modal para mostrar la infomarcion de la consulta
    const [modalConsulta, setModalConsulta] = useState(false);

    // hook para guardar los datos personales, con la api de consulta
    const [requestConsulta, setRequestConsult] = useState({});

    // hook para validar si ya se guardo el formulario.
    const [formSave, setFormSave] = useState(false);

    // hook para guardar los datos del formulario
    const [requestFormPersonal, setRequestFormPersonal] = useState({
        tipoDocumento: '',
        lugarExpedicionDocumento: '',
        sexo: '',
        edad: '',
        numeroDocumento: '',
        primerApellido: '',
        segundoApellido: '',
        nombres: '',
        fechaNacimiento: '',
        paisNacimiento: '',
        estadoCivil: '',
        eps: '',
        grupoSanguineo: '',
        peso: '',
        talla: '',
        discapacidad: '',
        tipoDiscapacidad: '',
        etnia: '',
        desplazado: '',
        trabaja: '',
        cabezaHogar: ''
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
            .get(`${BASE_URL}/user/datospersonales/${userId}?token=${token}`)
            .then(response => {
                const {
                    data: { codigo, datosPersonales }
                } = response;
                if (codigo === '0000') {
                        setNoEdit(true);
                    setRequestFormPersonal(
                        Object.assign({}, requestFormPersonal, {
                            tipoDocumento: datosPersonales.tipoDocumento,
                            lugarExpedicionDocumento:
                                datosPersonales.lugarExpedicionDocumento,
                            sexo: datosPersonales.sexo,
                            edad: datosPersonales.edad,
                            numeroDocumento: datosPersonales.numeroDocumento,
                            primerApellido: datosPersonales.primerApellido,
                            segundoApellido: datosPersonales.segundoApellido,
                            nombres: datosPersonales.nombres,
                            fechaNacimiento: datosPersonales.fechaNacimiento,
                            paisNacimiento: datosPersonales.paisNacimiento,
                            estadoCivil: datosPersonales.estadoCivil,
                            eps: datosPersonales.eps,
                            grupoSanguineo: datosPersonales.grupoSanguineo,
                            peso: datosPersonales.peso,
                            talla: datosPersonales.talla,
                            discapacidad: datosPersonales.discapacidad,
                            tipoDiscapacidad: datosPersonales.tipoDiscapacidad,
                            etnia: datosPersonales.etnia,
                            desplazado: datosPersonales.desplazado,
                            trabaja: datosPersonales.trabaja,
                            cabezaHogar: datosPersonales.cabezaHogar
                        })
                    );
                } else {
                    setTerminosCondiciones(true);
                }
            })
            .catch(error => console.log(error));
    }, []);

    // Funcion para guardar el formulario de datos personales
    const saveFormPersonal = async () => {
        const values = Object.values(requestFormPersonal);
        const valuesValidate = values.filter(item => item !== '');

        if (noEdit) {
            sweetAlert(WARNING, 'Atención', 'Para poder guardar debe habilitar el fomulario, haciendo clic en el botón editar.');
        } else {
            if (valuesValidate.length === 21) {
                let token = authService.getToken();
                let id = authService.getUserId();

                    try {
                        const response = await axios.put(
                            `${BASE_URL}/admin/users/modificarusuario/datospersonales/${userId}?token=${token}`,
                            requestFormPersonal
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
                sweetAlert(WARNING, 'Atención', MESSAGE_FIELD_REQUARED);
            }
        }
    };

    // Funcion para habilitar los campos del formulario para editarlos
    const editFormPersonal = () => {
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
                `${BASE_URL}/user/datospersonales/${id}?token=${token}`
            );

            if (response.data.codigo === '0000') {
                const {
                    data: { datosPersonales }
                } = response;
                setRequestConsult(
                    Object.assign({}, requestConsulta, datosPersonales)
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
            {swForm ? (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Tipo de documento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccione su de tipo de documento.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                placeholder='Tipo de documento'
                                value={requestFormPersonal.tipoDocumento}
                                required
                                disabled={noEdit}
                                selection
                                options={TIPO_DOCUMENTO_OPTIONS}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        tipoDocumento: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Número de documento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese el número de documento.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                disabled={noEdit}
                                value={requestFormPersonal.numeroDocumento}
                                placeholder='Número de documento'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        numeroDocumento: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Lugar de expedición (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese lugar de expedición de su documento.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={
                                    requestFormPersonal.lugarExpedicionDocumento
                                }
                                placeholder='Lugar de expedición'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        lugarExpedicionDocumento: value
                                    })
                                }
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
                                    text='Seleccione el tipo de sexo al cual pertenece'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                placeholder='Sexo'
                                required
                                disabled={noEdit}
                                value={requestFormPersonal.sexo}
                                selection
                                options={SEXO_OPTIONS}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        sexo: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Fecha de nacimiento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese su fecha de nacimiento.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                required
                                disabled={noEdit}
                                type='date'
                                value={requestFormPersonal.fechaNacimiento}
                                placeholder='dd/mm/aaaa'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        fechaNacimiento: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    {`Nombre(s)`} (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese su(s) nombre(s).'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormPersonal.nombres}
                                placeholder={`Nombre(s)`}
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        nombres: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Primer apellido (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese su primer apellido.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                value={requestFormPersonal.primerApellido}
                                required
                                disabled={noEdit}
                                placeholder='Primer Apellido'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        primerApellido: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Segundo apellido (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese su segundo apellido.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormPersonal.segundoApellido}
                                placeholder='Segundo apellido'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        segundoApellido: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Edad (<span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese su edad.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                disabled={noEdit}
                                value={requestFormPersonal.edad}
                                placeholder='Edad'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        edad: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    País de nacimiento (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese pais en el cual nació.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='text'
                                required
                                disabled={noEdit}
                                value={requestFormPersonal.paisNacimiento}
                                placeholder='País de nacimiento'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        paisNacimiento: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Estado civil (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccione su estado civil.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                disabled={noEdit}
                                selection
                                value={requestFormPersonal.estadoCivil}
                                placeholder='Estado civil'
                                options={ESTADO_CIVIL_OPTIONS}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        estadoCivil: value
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='form-sgdar'>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Seguridad social (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccione su seguridad social.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                disabled={noEdit}
                                selection
                                value={requestFormPersonal.eps}
                                placeholder='Seguridad social'
                                options={SEGURIDAD_SOCIAL_OPTIONS}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        eps: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Grupo Sanguineo (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccione el grupo sanguineo al cual pertenece.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                disabled={noEdit}
                                selection
                                value={requestFormPersonal.grupoSanguineo}
                                placeholder='Grupo sanguineo'
                                options={GRUPO_SANGUINEO_OPTIONS}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        grupoSanguineo: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Peso (<span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Ingrese su peso.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                disabled={noEdit}
                                value={requestFormPersonal.peso}
                                placeholder='Peso'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        peso: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Talla (<span className='isRequired'>*</span>
                                    )
                                </label>
                                <Tooltip
                                    text='Ingrese su talla.'
                                    icon='help circle'
                                />
                            </div>
                            <input
                                className='input-form'
                                type='number'
                                required
                                disabled={noEdit}
                                value={requestFormPersonal.talla}
                                placeholder='Talla'
                                onChange={({ target: { value } }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        talla: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Discapacidad (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccion si tiene alguna discapacidad.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                disabled={noEdit}
                                value={requestFormPersonal.discapacidad}
                                placeholder='Discapaciadad'
                                options={RESPUESTA_DOBLE}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        discapacidad: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Tipo discapacidad (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccione el tipo en que se encuentra clasificada su discapacidad.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                disabled={noEdit}
                                value={requestFormPersonal.tipoDiscapacidad}
                                placeholder='Tipo de discapaciadad'
                                options={TIPO_DISCAPACIDAD_OPTIONS}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        tipoDiscapacidad: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Etnia (<span className='isRequired'>*</span>
                                    )
                                </label>
                                <Tooltip
                                    text='Seleccione la etnia a la cual pertenece.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                disabled={noEdit}
                                value={requestFormPersonal.etnia}
                                placeholder='Ingrese etnia'
                                options={ETNIA_OPTIONS}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        etnia: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Desplazado (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccione si es desplazado o no.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                selection
                                disabled={noEdit}
                                value={requestFormPersonal.desplazado}
                                placeholder='Desplazado'
                                options={RESPUESTA_DOBLE}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        desplazado: value
                                    })
                                }
                            />
                        </div>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Trabaja (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccione si se trabaja o no.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                disabled={noEdit}
                                selection
                                value={requestFormPersonal.trabaja}
                                placeholder='Trabaja'
                                options={RESPUESTA_DOBLE}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        trabaja: value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='container-row-form'>
                        <div className='container-input'>
                            <div className='container-label'>
                                <label className='label-fomr' htmlFor=''>
                                    Cabeza de hogar (
                                    <span className='isRequired'>*</span>)
                                </label>
                                <Tooltip
                                    text='Seleccione si es cabeza de hogar o no.'
                                    icon='help circle'
                                />
                            </div>
                            <Dropdown
                                className='input-dropdown'
                                required
                                disabled={noEdit}
                                selection
                                value={requestFormPersonal.cabezaHogar}
                                placeholder='Cabeza de hogar'
                                options={RESPUESTA_DOBLE}
                                selectOnBlur={false}
                                onChange={(event, { value }) =>
                                    setRequestFormPersonal({
                                        ...requestFormPersonal,
                                        cabezaHogar: value
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className='container-pages-form'>
                <button
                    className='button-page'
                    style={{ background: `${swForm ? 'gray' : ''}` }}
                    onClick={() => setSwForm(true)}
                >
                    {`<`}
                </button>
                <button
                    className='button-page'
                    style={{ background: `${!swForm ? 'gray' : ''}` }}
                    onClick={() => setSwForm(false)}
                >
                    {`>`}
                </button>
            </div>

            <div className='container-buttons-form'>
                <button
                    className='buttons-save-edit'
                    onClick={() => saveFormPersonal()}
                >
                    GUARDAR
                </button>

                <button
                    className='buttons-save-edit'
                    onClick={() => editFormPersonal()}
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
                    <ConsultaDatosPersonales
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
            </div> */}
            {/* {openModalInfo && <InfoApp setOpenInfoModal={setOpenInfoModal} />} */}
        </div>
    );
};

export default AcademicForm;
