import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tooltip from '../../common/tooltip';
import Consulta from './consulta';
import authService from '../../../services/authService';
import { BASE_URL, ERROR } from '../../../constantGlobal';
import { sweetAlert } from '../../actionsGlobals';
import './consultas.css';
import { Pagination } from 'semantic-ui-react';
import { filterByName } from '../../../helpers/helpers';

const HistorialConsultasDeportologo = () => {
    const token = authService.getToken();
    const id = authService.getUserId();
    // hook para captarur el elemento de busqueda
    const [cedulaConsulta, setCedulaConsulta] = useState('');
    // hook para capturar las consultas realizadas por el deportologo.
    const [consultas, setConsultas] = useState([]);
    const [filteredConsultas, setFilteredConsultas] = useState([])
    const [pagination, setPagination] = useState({
        activePage: 1,
        totalPages: 1
    });
    const [updateHistory, setUpdateHistory] = useState(true);

    //useEffect para trar las consultas realizadas por el deportologo
    useEffect(() => {
        if (updateHistory) {
            getConsultationHistory();
            setUpdateHistory(false);
        }
    }, [updateHistory]);

    const getConsultationHistory = () => {
        axios
            .get(
                `${BASE_URL}/deportologo/obtenerevaluaciones/${id}?page=${pagination.activePage}&token=${token}`
            )
            .then(response => {
                if (response.data.codigo === '0000') {
                    setConsultas(response.data.datosCompletosUsuarios);
                    setFilteredConsultas(response.data.datosCompletosUsuarios);
                    setPagination({...pagination, totalPages: response.data.pages});
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

    // funcion que filtrara el arreglo por cedula de una persona
    const buscarConsultaDeportologo = () => {};

    const handlePaginationChange = (e, { activePage }) => {
        setPagination({ ...pagination, activePage });
        setUpdateHistory(true);
    };

    const handleFilterByName = value => {
        let tmpFilteredArray = filterByName(
            value,
            consultas,
            'numeroDocumento'
        );
        setCedulaConsulta(value);
        setFilteredConsultas(tmpFilteredArray);
    };

    return (
        <div className='container-consultas-realizadas'>
            <h1 className='title-form'>Consultas realizadas</h1>
            <div className='container-conusultas'>
                <div className='container-search-consultas'>
                    <span className='label-paciente-consulta'>Cedula : </span>
                    <input
                        type='text'
                        placeholder='Búsqueda por cedula'
                        className='input-consultas'
                        onChange={e =>
                            handleFilterByName(e.target.value)
                        }
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
                    {consultas.length ? (
                        filteredConsultas.map((item, index) => (
                            <Consulta key={index} consulta={item} />
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

export default HistorialConsultasDeportologo;
