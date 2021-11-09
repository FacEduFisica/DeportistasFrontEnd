import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './GeneratePermissions.scss';
import { sweetAlert } from '../../actionsGlobals';
import { ERROR, SUCCESS, BASE_URL, MESSAGE_PERMISOS_EDICION } from '../../../constantGlobal';
import authService from '../../../services/authService';
import axios from 'axios';
const GeneratePermissions = () => {
    const [userPermission, setUserPermission] = useState(null);
    const [actualStatus, setActualStatus] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(true);
    const PERMISSION = [
        {
            key: 1,
            text: 'Si',
            value: 1
        },
        {
            key: 2,
            text: 'No',
            value: 2
        }
    ];
    const handleGeneratePermissions = async () => {
        if (!!userPermission) {
           
            let urlForPermissions = '';
            const token = authService.getToken();
            if (userPermission === 1) {
                urlForPermissions = `/admin/users/cambiodedatos/habilitar`;
            } else {
                urlForPermissions = `/admin/users/cambiodedatos/deshabilitar`;
            }
            try {
                const response = await axios.get(
                    `${BASE_URL}${urlForPermissions}?token=${token}`
                );
                if (response.data.codigo === '0000' && !!response.data.estado) {
                  setUpdateStatus(true);
                    sweetAlert(
                        SUCCESS,
                        '¡Éxito!',
                        'Señor usuario se ha actualizado exitosamente el permiso de edición.'
                    );
                } else {
                    sweetAlert(
                        ERROR,
                        '¡Alerta!',
                        'Señor usuario ha ocurrido un error actualizando el permiso de edición.'
                    );
                }
            } catch (error) {
                console.log('There was an error generating the permissions');
            }
        } else {
            sweetAlert(
                ERROR,
                '¡Alerta!',
                'Señor usuario si desea generar permisos, el campo de generación de permisos es obligatorio.'
            );
        }
    };
    useEffect(() => {
      if(updateStatus){
        getActualPermissionStatus();
        setUpdateStatus(false);
      }
    }, [updateStatus])

    const getActualPermissionStatus = async () => {
      const token = authService.getToken()
      const response = await axios.get(`${BASE_URL}/admin/users/cambiodedatos/consultar?token=${token}`);
      if(response.data.codigo === '0000' && !!response.data.estado){
        const {estado} = response.data.puedeModificar[0];
        setActualStatus(estado);
      }
    }
    return (
        <div className='admin-generate-permission'>
            <h1>Generar permisos</h1>
            <div className='admin-generate-permission_container'>
                <div className='top-container'>
                    <div className='dropdown-container'>
                        <label>Generar permisos de edición</label>
                        <Dropdown
                            placeholder='Seleccione'
                            selection
                            required
                            options={PERMISSION}
                            value={userPermission}
                            onChange={(e, { value }) =>
                                setUserPermission(value)
                            }
                            className='input-dropdown'
                            selectOnBlur={false}
                        />
                    </div>
                    <div className='status-container'>
                        <label htmlFor=''>Permisos de edición:</label>
                        <span>
                            {actualStatus ? 'Habilitado' : 'Deshabilitado'}
                        </span>
                    </div>
                </div>
                <div className='alert-container'>
                    <label>¡Atención!</label>
                    <div>
                        <p>{MESSAGE_PERMISOS_EDICION}</p>
                    </div>
                </div>
                <div className='action-container'>
                    <button
                        onClick={() => handleGeneratePermissions()}
                        className='buttons-save-edit'
                    >
                        GENERAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeneratePermissions;
