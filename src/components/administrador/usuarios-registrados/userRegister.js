import React, {useState, useEffect} from "react";
import User from './User';
import './User.scss';
import axios from 'axios';
import {BASE_URL, SUCCESS, ERROR} from '../../../constantGlobal';
import {ROLELIST} from '../../FormConstants/constants'
import authService from "../../../services/authService";
import { sweetAlert } from "../../actionsGlobals";
import { filterByName } from "../../../helpers/helpers";
import { Pagination } from "semantic-ui-react";

const UserRegister = () => {
  const [users, setUsers] = useState([]);
  const [getUsers, setGetUsers] = useState(true);
  const token = authService.getToken();
  const [filteredUsers, setFilteredUsers] = useState([])
  const [pagination, setPagination] = useState({
    activePage: 1,
    totalPages: 1
  })

  useEffect(() => {
    if(getUsers){
      getUsersList();
      setGetUsers(false)
    }
  }, [getUsers])

  const getUsersList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/users?page=${pagination.activePage}`);
      if(response.data.estado){
        setUsers(response.data.usuarios);
        setFilteredUsers(response.data.usuarios)
        setPagination({...pagination, totalPages: response.data.pages})
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeUserStatus = async (e, id) => {
    e.stopPropagation();
    let tmpUsers = users.map(user => {
      if(user._id === id){
        user.estado = e.target.checked
      }
      return user
    })
    setUsers(tmpUsers);
    let isChecked = e.target.checked;
    let url = '';
    if(isChecked){
      url = `${BASE_URL}/admin/users/habilitarusuario/${id}?token=${token}`
    }else{
      url = `${BASE_URL}/admin/users/deshabilitarusuario/${id}?token=${token}`
    }
    const response = await axios.get(url)
  }

  const handleChangeRole = async (e, value, id) => {
    try {
      const response = await axios.put(`${BASE_URL}/admin/users/cambioderol/${id}?token=${token}`, {role: value})
      if(response.data.estado && response.data.codigo === '0000'){
        sweetAlert(SUCCESS, '¡Éxito!', 'Se ha cambiado el rol exitosamente');
        setGetUsers(true);
      }else{
        sweetAlert(ERROR, '¡Alerta!', 'No fue posible realizar el cambio de rol.');
      }
    } catch (error) { 
      console.log(error);
      sweetAlert(ERROR, '¡Alerta!', 'No fue posible realizar el cambio de rol.');
    }
  }
  
  const handleFilterByName = (value) => {
    let tmpFilteredArray = filterByName(value, users, 'nombre');
    setFilteredUsers(tmpFilteredArray)
  }

  const handlePaginationChange = (e, {activePage}) => {
    setPagination({...pagination, activePage})
    setGetUsers(true)

  }
  return (
    <div className='user-list-container'>
      <h1>Usuarios registrados</h1>
      <div className='user-list-body'>
        <div className='search-container'>
          <label className='label-fomr'>Buscar usuario: </label>
          <input type="text" className='input-form' onChange={(e) => handleFilterByName(e.target.value)} placeholder='Búsqueda por nombre'/>
        </div>
        <div className='list-container'>
          {/* aca se mapean los usuarios */}
          {
            users.length > 0 ? (
              filteredUsers.map((user, i) => (
                <User key={i} user={user} handleChangeRole={handleChangeRole} i={i} roleList={ROLELIST} handleChangeUserStatus={handleChangeUserStatus}/>
              ))
            ) : (
              <div>
                <p>No hay usuarios registrados</p>
              </div>
            )
          }
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

export default UserRegister;
