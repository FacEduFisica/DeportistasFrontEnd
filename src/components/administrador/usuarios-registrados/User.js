import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import UserModal from './modals/UserModal';
import moment from 'moment';
import authService from '../../../services/authService';

const User = ({
    user,
    i,
    roleList,
    handleChangeUserStatus,
    handleChangeRole
}) => {
    const [role, setRole] = useState('');
    const userRole = authService.getUserData().usuario.role;
    const [modalMenu, setModalMenu] = useState([
        {
            text: 'Datos personales',
            value: 1
        }
    ]);
    const [modal, toggleModal] = useState(false);
    const handleSetRole = () => {
        let tmpRole = '';
        let tmpMenu = modalMenu;
        switch (user.role) {
            case 'ADMINISTRADOR_ROLE':
                tmpRole = 'Administrador';
                break;
            case 'ESTUDIANTE_ROLE':
                tmpRole = 'Estudiante';
                tmpMenu = [
                    ...tmpMenu,
                    {
                        text: 'Datos Socioeconomicos',
                        value: 2
                    },
                    {
                        text: 'Datos Académicos',
                        value: 3
                    },
                    {
                        text: 'Datos deportivos',
                        value: 4
                    }
                ];
                break;
            case 'FISIOTERAPEUTA_ROLE':
                tmpRole = 'Fisioterapeuta';
                break;
            case 'ENTRENADOR_ROLE':
                tmpRole = 'Entrenador';

                break;
            case 'DEPORTOLOGO_ROLE':
                tmpRole = 'Deportologo';

                break;

            default:
                tmpRole = 'Consultor';
                break;
        }
        setRole(tmpRole);
        setModalMenu(tmpMenu);
    };

    useEffect(() => {
        handleSetRole();
    }, []);

    const handleOpenModal = e => {
        // e.stopPropagation();
        toggleModal(true);
    };

    const handleCloseModal = e => {
        e.stopPropagation();
        toggleModal(false);
    };
    return (
        <div
            className='user-container'
            key={i}
            onClick={e => handleOpenModal(e)}
        >
            <div className={`user-name-container ${userRole === 'ADMINISTRADOR_ROLE' ? '': 'lower-space'}`}>
                <i className='user circle icon'></i>
                <p>{user.nombre}</p>
            </div>
            <div className={`user-id-container ${userRole === 'ADMINISTRADOR_ROLE' ? '': 'lower-space'}`}>
                <p>{moment(user.fechaRegistro).format('MM-DD-YYYY')}</p>
            </div>
            <div className={`actual-role-container ${userRole === 'ADMINISTRADOR_ROLE' ? '': 'lower-space'}`} >
                <p>{role}</p>
            </div>
            {userRole === 'ADMINISTRADOR_ROLE' ? (
                <>
                    <div className='user-role-container'>
                        <label htmlFor=''>Cambiar rol:</label>
                        <Dropdown
                            value={user.role}
                            options={roleList}
                            placeholder={'Seleccione...'}
                            selectOnBlur={false}
                            selection
                            className='input-dropdown'
                            onChange={(e, { value }) =>
                                handleChangeRole(e, value, user._id)
                            }
                        />
                    </div>
                    <div className='user-status-container'>
                        <div>
                            {user.estado ? 'Habilitado' : 'Deshabilitado'}
                        </div>
                        <div
                            className='toggle-btn'
                            onClick={e => e.stopPropagation()}
                        >
                            <input
                                type='checkbox'
                                className='toggle-input'
                                checked={user.estado}
                                onChange={e =>
                                    handleChangeUserStatus(e, user._id)
                                }
                            />
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}

            {modal && (
                <UserModal
                    modalMenu={modalMenu}
                    toggleModal={handleCloseModal}
                    userId={user._id}
                />
            )}
        </div>
    );
};

export default User;
