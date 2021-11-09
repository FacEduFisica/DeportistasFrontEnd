import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tooltip from '../../common/tooltip';
import authService from '../../../services/authService';
import ConsultaFisio from './consultaFisios';
import { BASE_URL, ERROR } from '../../../constantGlobal';
import { sweetAlert } from '../../actionsGlobals';
import { Pagination } from 'semantic-ui-react';
import { filterByName } from '../../../helpers/helpers';
const HistoryFisioterapias = () => {
    const token = authService.getToken();
    // hook seteo de la cedula o item de busqueda en el filtro
    const [cedulaConsulta, setCedulaConsulta] = useState('');

    // hook para capturar el listado de consultas realizadas por los fisioterapeutas
    const [consultasFisios, setConsultasFisios] = useState([]);
    const [updateConsultation, setUpdateConsultation] = useState(true);
    const [filteredConsultas, setFilteredConsultas] = useState([])

    const [pagination, setPagination] = useState({
        activePage: 1,
        totalPages: 1
    });

    // useEffect para traer todas las consutas de todos los fisioterapeutas
    useEffect(() => {
        if (updateConsultation) {
            getConsultation();
            setUpdateConsultation(false);
        }
    }, []);

    const getConsultation = () => {

        axios
            .get(
                `${BASE_URL}/deportologo/obtenerconsultas/fisioterapeutas?page=${pagination.activePage}&token=${token}`
            )
            .then(response => {
                if (response.data.codigo === '0000') {
                    setConsultasFisios(response.data.datosCompletosUsuarios);
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

    // funcion para filtrar por el criterio de busqueda
    const buscarConsultaFisioterapeuta = () => {
        const filterconsulta = consultasFisios.filter(item =>
            item.numeroDocumento == cedulaConsulta
                ? console.log('si cumple')
                : console.log('no cumple')
        );
        setConsultasFisios(filterconsulta);
    };

    const handlePaginationChange = (e, { activePage }) => {
        setPagination({ ...pagination, activePage });
        setUpdateConsultation(true);
    };

    const handleFilterByName = value => {
        let tmpFilteredArray = filterByName(
            value,
            consultasFisios,
            'numeroDocumento'
        );
        setCedulaConsulta(value);
        setFilteredConsultas(tmpFilteredArray);
    };

    return (
        <div className='container-consultas-realizadas'>
            <h1 className='title-form'>
                Consultas realizadas por los fisioterapeutas
            </h1>
            <div className='container-conusultas'>
                <div className='container-search-consultas'>
                    <span className='label-paciente-consulta'>Cedula : </span>
                    <input
                        type='text'
                        className='input-consultas'
                        placeholder='Busqueda por numero de documento'
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
                    {consultasFisios.length ? (
                        filteredConsultas.map((item, index) => (
                            <ConsultaFisio key={index} consulta={item} />
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

export default HistoryFisioterapias;
