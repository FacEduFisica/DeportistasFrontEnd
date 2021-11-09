import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tooltip from '../../common/tooltip';
import authService from '../../../services/authService';
import ConsultaDeport from './consultasDeport';
import { BASE_URL, ERROR } from '../../../constantGlobal';
import { sweetAlert } from '../../actionsGlobals';
import { Pagination } from 'semantic-ui-react';
import { filterByName } from '../../../helpers/helpers';

const MedicalHistory = () => {
    const token = authService.getToken();
    // hook seteo de la cedula o item de busqueda en el filtro
    const [cedulaConsulta, setCedulaConsulta] = useState('');

    // hook para capturar el listado de consultas realizadas por los deportologos
    const [consultasDeport, setConsultasDeport] = useState([]);
    const [filteredConsultas, setFilteredConsultas] = useState([]);

    const [pagination, setPagination] = useState({
        activePage: 1,
        totalPages: 1
    });
    const [updateMedicalHistory, setUpdateMedicalHistory] = useState(true);

    // useEffect para traer todas las consutas de todos los deportologos
    useEffect(() => {
        if (updateMedicalHistory) {
            getMedicalHistory();
            setUpdateMedicalHistory(false);
        }
    }, [updateMedicalHistory]);

    const getMedicalHistory = () => {
        axios
            .get(
                `${BASE_URL}/fisioterapeuta/historiaclinica/deportologos?page=${pagination.activePage}&token=${token}`
            )
            .then(response => {
                if (response.data.codigo === '0000') {
                    setConsultasDeport(response.data.evaluaciones);
                    setFilteredConsultas(response.data.evaluaciones);
                    setPagination({
                        ...pagination,
                        totalPages: response.data.pages
                    });
                } else {
                    sweetAlert(
                        ERROR,
                        'Error',
                        'Ha ocurrido un error con el servidor intentelo de nuevo.'
                    );
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    // funcion para filtrar por el criterio de busqueda
    const buscarConsultaDeportologo = () => {};

    const handlePaginationChange = (e, { activePage }) => {
        setPagination({ ...pagination, activePage });
        setUpdateMedicalHistory(true);
    };

    const handleFilterByName = value => {
        let tmpFilteredArray = filterByName(
            value,
            consultasDeport,
            'numeroDocumento'
        );
        setCedulaConsulta(value);
        setFilteredConsultas(tmpFilteredArray);
    };

    return (
        <div className='container-consultas-realizadas'>
            <h1 className='title-form'>
                Consultas realizadas por los deportologos
            </h1>
            <div className='container-conusultas'>
                <div className='container-search-consultas'>
                    <span className='label-paciente-consulta'>Cedula : </span>
                    <input
                        type='text'
                        className='input-consultas'
                        placeholder='Busqueda por numero de documento'
                        onChange={e => handleFilterByName(e.target.value)}
                    />
                    <button
                        className='button-search-consultas'
                        onClick={() => handleFilterByName(cedulaConsulta)}
                    >
                        <Tooltip
                            text='Buscar consulta por CC del paciente'
                            icon='search'
                        />
                    </button>
                </div>
                <div className='list-container-consultas'>
                    {consultasDeport.length ? (
                        filteredConsultas.map((item, index) => (
                            <ConsultaDeport key={index} consulta={item} />
                        ))
                    ) : (
                        <span className='no-found-datos'>
                            No hay consultas.
                        </span>
                    )}
                    <Pagination
                        activePage={pagination.activePage}
                        onPageChange={handlePaginationChange}
                        totalPages={pagination.totalPages}
                        className='pagination-app'
                    />
                </div>
            </div>
        </div>
    );
};

export default MedicalHistory;
