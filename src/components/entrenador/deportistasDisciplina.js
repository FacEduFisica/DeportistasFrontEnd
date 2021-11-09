import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tooltip from '../common/tooltip';
import Deportista from './deportista';
import authService from '../../services/authService';
import { BASE_URL, ERROR } from '../../constantGlobal';
import { filterByName } from '../../helpers/helpers';
import { Pagination } from 'semantic-ui-react';


// import './consultas.css';

const DeportistasDisciplina = () => {
    const token = authService.getToken();
    const id = authService.getUserId();
    // hook para capturar el genero y la disciplina que dicta el entrenador
    const [requestDisciplina, setRequestDisciplina] = useState({
        nombreDisciplina: '',
        generoDisciplina: ''
    });

    // hook para captarur el elemento de busqueda
    const [cedulaConsulta, setCedulaConsulta] = useState('');

    // hook para capturar las consultas realizadas por el deportologo.
    const [deportistasDisciplinas, setDeportistasDisciplina] = useState([]);
    const [filteredDeportista, setFilteredDeportista] = useState([]);
    const [updateDeportista, setUpdateDeportista] = useState(true)
    const [pagination, setPagination] = useState({
        activePage: 1,
        totalPages: 1
      })

    //useEffect para trar las consultas realizadas por el deportologo
    useEffect(() => {

if(updateDeportista){
    getDeportistaDisciplina();
    setUpdateDeportista(false)
}

    }, [updateDeportista]);

    const getDeportistaDisciplina = () => {
        axios
        .get(
            `${BASE_URL}/entrenador/obtenerdisciplina/${id}?token=${token}`
        )
        .then(response => {
            if (response.data.codigo === '0000') {
                setRequestDisciplina(
                    Object.assign({}, requestDisciplina, {
                        nombreDisciplina: response.data.nombreDisciplina,
                        generoDisciplina: response.data.generoDisciplina
                    })
                );
            }
        });

    axios
        .get(
            `${BASE_URL}/entrenador/obtenerestudiantes/${id}?page=${pagination.activePage}&token=${token}`
        )
        .then(response => {
          
            if (response.data.codigo === '0000') {
                setDeportistasDisciplina(response.data.usuarios);
                setFilteredDeportista(response.data.usuarios);
                setPagination({...pagination, totalPages:response.data.pages })
            } 
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleFilterByName = (value) => {
        let tmpFilteredArray = filterByName(value, deportistasDisciplinas, 'numeroDocumento');
        setCedulaConsulta(value)
        setFilteredDeportista(tmpFilteredArray)
      }
    
      const handlePaginationChange = (e, {activePage}) => {
        setPagination({...pagination, activePage})
        setUpdateDeportista(true)
    
      }

    return (
        <div className='container-consultas-realizadas'>
            <h1 className='title-form'>{`Deportistas disciplina - ${requestDisciplina.nombreDisciplina}`}</h1>
            <div className='container-conusultas'>
                <div className='container-search-consultas'>
                    <span className='label-paciente-consulta'>Cedula : </span>
                    <input
                        type='text'
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
                    {deportistasDisciplinas.length ? (
                        filteredDeportista.map((item, index) => (
                            <Deportista key={index} deportista={item} />
                        ))
                    ) : (
                        <span className='no-found-datos'>
                            No hay deportistas registrados en esta disciplina.
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

export default DeportistasDisciplina;
