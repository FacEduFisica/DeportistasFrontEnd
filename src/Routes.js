import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter
} from 'react-router-dom';

import Login from './components/Login/Login';
import Register from './components/Login/Register';

import PersonalForm from './components/FormPersonal/personalForm';

import IsAuthenticated from './components/Login/auth/IsAuthenticated';
import SocioeconomicForm from './components/student/socioeconomicForm';
import SportForm from './components/student/sportForm';
import AcademicForm from './components/student/academicForm';

import FormFisioterapia from './components/Fisioterapeuta/formFisioterapia';
import MedicalHistory from './components/Fisioterapeuta/consultasDeportivas/medicalHistory';
import FisioterapiasHistory from './components/Fisioterapeuta/historialConsultas/fisioterapiasHistory';

import MiDisciplina from './components/entrenador/miDisciplina';
import DeportistasDisciplina from './components/entrenador/deportistasDisciplina';
import GenerarPlanilla from './components/entrenador/generarPlanilla';

import FormDeportivo from './components/deportologo/formDeportivo';
import HistoryFisioterapias from './components/deportologo/consultasFisios/historyFisioterapias';

import UserRegister from './components/administrador/usuarios-registrados/userRegister';
import FormRegister from './components/administrador/registrar-usuarios/formRegister';
import GeneratePermissions from './components/administrador/generar-permisos/generatePermission';
import AthleticDiscipline from './components/administrador/disciplinas-deportivas/AthleticDiscipline';
import Reports from './components/administrador/reportes/Reports';

import Welcome from './components/common/welcome';
import HistorialConsultasDeportologo from './components/deportologo/historialconsultas/historialConsultasDeportologo';
import RestablecerContraseña from './components/Login/restablecerContraseña/restablecerContraseña';
import VerificarCorreo from './components/Login/verificarCorreo/verificarCorreo';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/registrarse' component={Register} />
                <Route path='/reset/:token' component={RestablecerContraseña} />
                <Route path ='/confirmacion/:token' component={VerificarCorreo} />
                <IsAuthenticated exact path='/home' component={Welcome} />
                {/* Rutas Estudiantes*/}
                <IsAuthenticated
                    path='/general/formulario-personal'
                    component={PersonalForm}
                />
                <IsAuthenticated
                    path='/estudiantes/formulario-socioeconomico'
                    component={SocioeconomicForm}
                />
                <IsAuthenticated
                    path='/estudiantes/formulario-deportivo'
                    component={SportForm}
                />
                <IsAuthenticated
                    path='/estudiantes/formulario-academico'
                    component={AcademicForm}
                />
                {/* Rutas Fisioterapeuta */}
                <IsAuthenticated
                    path='/fisioterapeuta/formulario-fisioterapia'
                    component={FormFisioterapia}
                />
                <IsAuthenticated
                    path='/fisioterapeuta/historial-medico'
                    component={MedicalHistory}
                />
                <IsAuthenticated
                    path='/fisioterapeuta/historial-fisioterapias'
                    component={FisioterapiasHistory}
                />
                <IsAuthenticated
                    path='/fisioterapeuta/generar-planilla'
                    component={Reports}
                />
                {/* Rutas Entrenador */}
                <IsAuthenticated
                    path='/entrenador/mi-disciplina'
                    component={MiDisciplina}
                />
                <IsAuthenticated
                    path='/entrenador/deportistas-disciplina'
                    component={DeportistasDisciplina}
                />
                <IsAuthenticated
                    path='/entrenador/generar-planilla'
                    component={Reports}
                />
                {/* Rutas Deportologo */}
                <IsAuthenticated
                    path='/deportologo/formulario-personal'
                    component={PersonalForm}
                />
                <IsAuthenticated
                    path='/deportologo/formulario-deportivo'
                    component={FormDeportivo}
                />
                <IsAuthenticated
                    path='/deportologo/historial-fisioterapias'
                    component={HistoryFisioterapias}
                />
                <IsAuthenticated
                    path='/deportologo/historial-consultas'
                    component={HistorialConsultasDeportologo}
                />
                <IsAuthenticated
                    path='/deportologo/generar-reportes'
                    component={Reports}
                />
                {/* Rutas Consultor */}
                <IsAuthenticated
                    path='/consultor/usuarios-registrados'
                    component={UserRegister}
                />
                <IsAuthenticated
                    path='/consultor/generar-reportes'
                    component={Reports}
                />
                {/* Rutas Administrador */}
                <IsAuthenticated
                    path='/administrador/usuarios-registrados'
                    component={UserRegister}
                />
                <IsAuthenticated
                    path='/administrador/registrar-usuario'
                    component={FormRegister}
                />
                <IsAuthenticated
                    path='/administrador/generar-permisos'
                    component={GeneratePermissions}
                />
                <IsAuthenticated
                    path='/administrador/generar-disciplinas'
                    component={AthleticDiscipline}
                />
                <IsAuthenticated
                    path='/administrador/generar-reportes'
                    component={Reports}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
