import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Profile from '../../../assets/profile.png';
import CloseSession from '../../common/CloseSession';
import authService from '../../../services/authService';
import { SIDEBARMENU } from './constants';
import './SideBar.scss';
import axios from 'axios';
import { BASE_URL, ERROR } from '../../../constantGlobal';
import { sweetAlert } from '../../actionsGlobals';
import { SRC_BASE } from '../../../constantGlobal';

let bodyFormData = new FormData();

const SideBar = () => {
    const userRole = authService.getUserRole();
    const userName = authService.getUserData().usuario.nombre;
    const userId = authService.getUserId();
    const token = authService.getToken();

    const [userImg, setUserImg] = useState(Profile);
    const [logoutRedirect, setLogoutRedirect] = useState('');
    const handleSetUserPhoto = async e => {
        let file = e.target.files[0];
        const isValidImageSize = imageSizeValidation(file, 0.5);
        if (!isValidImageSize) {
            sweetAlert(
                ERROR,
                '¡Alerta!',
                'El peso máximo de la foto es 0.5 megas'
            );
            return;
        }
        const isValidImageDimension = await validateImageDimension(file);
        if (!isValidImageDimension) {
            sweetAlert(
                ERROR,
                '¡Alerta!',
                'El tamaño máximo de la foto es 300x300 píxeles'
            );
            return;
        }
        bodyFormData.delete('archivo');
        bodyFormData.append('archivo', file);
        axios({
            method: 'POST',
            url: `${BASE_URL}/upload/user/imagen/${userId}?token=${token}`,
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => {
                if (response.data.estado && response.data.codigo === '0000') {
                    axios
                        .post(
                            `${BASE_URL}/upload/user/imagen/amazon/${response.data.nombreArchivo}?token=${token}`
                        )
                        .then(res => {
                            console.log(
                                'lo que tiene la respuesta de la subida a aws ==> ',
                                res.data
                            );
                            if (
                                res.data.estado &&
                                response.data.codigo === '0000'
                            ) {
                                let src = SRC_BASE + res.data.linkImagen;
                                localStorage.setItem('userImg', src);
                                setUserImg(src);
                            }
                        })
                        .catch(err =>
                            console.log('Hubo un error con la subida a AWS')
                        );
                }
            })
            .catch(error => {
                console.log('Hubo un error al intentar subir la foto');
            });
    };

    const validateImageDimension = async image => {
        try {
            const result = await Promise.all([
                new Promise(function (resolve, reject) {
                    const blob = image;
                    const _URL = window.URL || window.webkitURL;

                    const url = _URL.createObjectURL(blob);
                    const img = new Image();

                    img.onload = function () {
                        _URL.revokeObjectURL(url);
                        if (
                            this.naturalWidth > 300 ||
                            this.naturalHeight > 300
                        ) {
                            resolve(false);
                        }
                        resolve(true);
                    };
                    img.src = url;
                })
            ]);
            return result[0];
        } catch (error) {
            return false;
        }
    };

    const imageSizeValidation = (image, maxSize) => {
        if (image.size > maxSize * 1024 * 1024) return false;
        return true;
    };

    useEffect(() => {
        let image = localStorage.getItem('userImg');
        if (image) {
            setUserImg(image);
        } else {
            setUserImg(Profile);
        }
    }, []);

    return (
        <div className='navbar-student-container'>
            <div className='navbar-student'>
                <div className='container-image-name'>
                    <div>
                        <img
                            className='image-profile'
                            src={userImg}
                            onError={() => setUserImg(Profile)}
                            alt='profile-image'
                        />
                        <div>
                            <input
                                type='file'
                                id='user_img'
                                accept=' .png, .jpg, .jpeg'
                                name='user_img'
                                onChange={e => handleSetUserPhoto(e)}
                            />
                            <label htmlFor='user_img' className='load-user_img'>
                                {' '}
                                <i className='camera icon'></i>
                            </label>
                        </div>
                    </div>
                    <h3 className='name-user'>{userName}</h3>
                </div>
                <div className='container-navbar'>
                    <ul className='list-navbar'>
                        {SIDEBARMENU.map(option => {
                            if (option.allowedClientrole.includes(userRole)) {
                                return (
                                    <div className='item-list'>
                                        <NavLink
                                            to={option.to}
                                            activeClassName='active-navbar'
                                            className='item-list-navlink'
                                        >
                                            {option.menuText}
                                        </NavLink>
                                    </div>
                                );
                            } else {
                                return '';
                            }
                        })}
                    </ul>
                </div>
                <CloseSession />
            </div>
            {logoutRedirect && <Redirect to={logoutRedirect} />}
        </div>
    );
};

export default SideBar;
