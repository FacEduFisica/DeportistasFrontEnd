import React, { useState, useEffect } from 'react';
import './AthleticDiscipline.scss';
import Tooltip from '../../common/tooltip';
import axios from 'axios';
import { BASE_URL, SUCCESS, WARNING } from '../../../constantGlobal';
import authService from '../../../services/authService';
import { sweetAlert } from '../../actionsGlobals';
import DeleteDisciplineModal from './DeleteDisciplineModal';

const AthleticDiscipline = () => {
    const [disciplines, setDisciplines] = useState([]);
    const [discipline, setDiscipline] = useState({ _id: '', nombre: '' });
    const [editDiscipline, setEditDiscipline] = useState(false);
    const [updateDisciplines, setUpdateDisciplines] = useState(true);
    const [deleteModal, toggleDeleteModal] = useState(false);
    const token = authService.getToken();

    const DisciplineCard = ({
        discipline,
        i,
        selectDisciplineToEdit,
        handleDeleteDiscipline
    }) => {
        return (
            <div
                key={i}
                className='discipline-card'
                onClick={e => selectDisciplineToEdit(discipline)}
            >
                <p>{discipline.nombre}</p>
                <button
                    onClick={e => {
                        e.stopPropagation();
                        toggleDeleteModal(discipline._id);
                    }}
                >
                    <i className='close icon'></i>
                </button>
                <DeleteDisciplineModal
                    discipline={discipline}
                    deleteModal={deleteModal}
                    toggleDeleteModal={toggleDeleteModal}
                    handleDeleteDiscipline={handleDeleteDiscipline}
                />
            </div>
        );
    };

    const getDisciplines = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/disciplinas/obtenerdisciplinas?token=${token}`
            );
            if (response.data.estado && response.data.codigo === '0000') {
                setDisciplines(response.data.disciplinas);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (updateDisciplines) {
            getDisciplines();
            setUpdateDisciplines(false);
        }
    }, [updateDisciplines]);

    const selectDisciplineToEdit = discipline => {
        setEditDiscipline(true);
        setDiscipline(discipline);
    };
    const handleEditDiscipline = value => {
        setDiscipline({ ...discipline, nombre: value });
    };
    
    const handleDeleteDiscipline = async discipline => {
        try {
            let tmpDisciplines = disciplines.filter(
                element => element._id !== discipline._id
            );
            const response = await axios.delete(
                `${BASE_URL}/admin/disciplinas/eliminardisciplina/${discipline.nombre}?token=${token}`                
            );
            
            console.log('eliminar disciplina response ==> ', response);
            setTimeout(() => {
                setDisciplines(tmpDisciplines);
                sweetAlert(
                    SUCCESS,
                    '¡Éxito!',
                    'La disciplina se eliminó satisfactoriamente.'
                );
            }, 500);
        } catch (error) {
            console.log(error);
        }
    };

    const sendEditedDiscipline = async () => {
        if (discipline.nombre) {
            let isRepeated = validateDiscipline();
            if(!isRepeated){
                if (!editDiscipline) {
                    let url = `${BASE_URL}/admin/disciplinas/registrardisciplina?token=${token}`;
                    const response = await axios.post(url, {
                        nombre: discipline.nombre
                    });
                    if (response.data.estado && response.data.codigo === '0000') {
                        sweetAlert(
                            SUCCESS,
                            'Éxito!',
                            `La disciplina ${discipline.nombre} ha sido creada satisfactoriamente.`
                        );
                        setDiscipline({ _id: '', nombre: '' });
                        setUpdateDisciplines(true);
                        return;
                    }
                    sweetAlert(
                        WARNING,
                        '¡Alerta!',
                        'Ha ocurrido un error al crear la disciplina'
                    );
                } else {
                    let url = `${BASE_URL}/admin/disciplinas/modificardisciplina/${discipline._id}?token=${token}`;
                    const response = await axios.put(url, {
                        nombre: discipline.nombre
                    });
                    if (response.data.estado && response.data.codigo === '0000') {
                        sweetAlert(
                            SUCCESS,
                            'Éxito!',
                            `La disciplina ${discipline.nombre} ha sido editada satisfactoriamente.`
                        );
                        setDiscipline({ _id: '', nombre: '' });
                        setUpdateDisciplines(true);
                        setEditDiscipline(false);
                        return;
                    }
                    sweetAlert(
                        WARNING,
                        '¡Alerta!',
                        'Ha ocurrido un error al editar la disciplina'
                    );
                }
            }else{
                sweetAlert(WARNING, '¡Alerta!', 'Esta disciplina ya se encuentra registrada.');
            }
        } else {
            sweetAlert(WARNING, '¡Alerta!', 'El campo disciplina es requerido');
        }
    };
    const validateDiscipline = () => {
        let isRepeated = false;
        let formatedDiscipline = discipline.nombre.replace(/ /g, '').toLowerCase();
        disciplines.forEach(element => {
            if(formatedDiscipline === element.nombre.replace(/ /g, '').toLowerCase()){
                isRepeated = true;
                return
            }
        })
        return isRepeated
    }

    return (
        <div className='user-register-container'>
            <h1>Disciplinas deportivas</h1>
            <div className='form-sgdar' style={{ height: '90%', width: '95%' }}>
                <div className='container-search-paciente'>
                    <span className='label-paciente-cedula'>
                        {' '}
                        {!editDiscipline
                            ? 'Añadir disciplina'
                            : 'Editar disciplina'}
                    </span>
                    <input
                        type='text'
                        className='input-paciente'
                        value={discipline.nombre}
                        
                        onChange={e => handleEditDiscipline(e.target.value)}
                        placeholder='Ingresa disciplina deportiva'
                    />
                    <button
                        className='button-search-paciente'
                        onClick={() => sendEditedDiscipline()}
                    >
                        <Tooltip
                            text={!editDiscipline ? 'Agregar disciplina deportiva' : 'Editar disciplina deportiva'}
                            icon={!editDiscipline ? 'add' : 'edit'}
                        />
                    </button>
                </div>
                <div className='disciplines-list_container'>
                    {disciplines.length > 0 ? (
                        disciplines.map((discipline, i) => (
                            <DisciplineCard
                                key={i}
                                discipline={discipline}
                                i={i}
                                selectDisciplineToEdit={selectDisciplineToEdit}
                                handleDeleteDiscipline={handleDeleteDiscipline}
                            />
                        ))
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 20
                            }}
                        >
                            <span
                                className='no-found-datos'
                                style={{
                                    textAlign: 'center',
                                    display: 'block'
                                }}
                            >
                                No hay disciplinas registradas
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AthleticDiscipline;
