export const SIDEBARMENU = [
           {
               to: '/general/formulario-personal',
               menuText: 'Mis datos personales',
               allowedClientrole: [
                   'ADMINISTRADOR_ROLE',
                   'ESTUDIANTE_ROLE',
                   'FISIOTERAPEUTA_ROLE',
                   'ENTRENADOR_ROLE',
                   'DEPORTOLOGO_ROLE',
                   'CONSULTOR_ROLE'
               ]
           },
           {
               to: '/estudiantes/formulario-socioeconomico',
               menuText: 'Mis datos socioeconómicos',
               allowedClientrole: ['ESTUDIANTE_ROLE']
           },
           {
               to: '/estudiantes/formulario-deportivo',
               menuText: 'Mis datos deportivos',
               allowedClientrole: ['ESTUDIANTE_ROLE']
           },
           {
               to: '/estudiantes/formulario-academico',
               menuText: 'Mis datos académicos',
               allowedClientrole: ['ESTUDIANTE_ROLE']
           },
           {
               to: '/fisioterapeuta/formulario-fisioterapia',
               menuText: 'Formulario fisioterapia',
               allowedClientrole: ['FISIOTERAPEUTA_ROLE']
           },
           {
               to: '/fisioterapeuta/historial-medico',
               menuText: 'Consultar historial médico',
               allowedClientrole: ['FISIOTERAPEUTA_ROLE']
           },
           {
               to: '/fisioterapeuta/historial-fisioterapias',
               menuText: 'Consultas realizadas',
               allowedClientrole: ['FISIOTERAPEUTA_ROLE']
           },
           {
               to: '/fisioterapeuta/generar-planilla',
               menuText: 'Generar planilla',
               allowedClientrole: ['FISIOTERAPEUTA_ROLE']
           },
           {
               to: '/entrenador/mi-disciplina',
               menuText: 'Mi disciplina deportiva',
               allowedClientrole: ['ENTRENADOR_ROLE']
           },
           {
               to: '/entrenador/deportistas-disciplina',
               menuText: 'Deportistas disciplina',
               allowedClientrole: ['ENTRENADOR_ROLE']
           },
           {
               to: '/entrenador/generar-planilla',
               menuText: 'Generar planilla',
               allowedClientrole: ['ENTRENADOR_ROLE']
           },
           {
               to: '/deportologo/formulario-deportivo',
               menuText: 'Formulario deportivo',
               allowedClientrole: ['DEPORTOLOGO_ROLE']
           },
           {
               to: '/deportologo/historial-fisioterapias',
               menuText: 'Historial fisioterapeutico',
               allowedClientrole: ['DEPORTOLOGO_ROLE']
           },
           {
               to: '/deportologo/historial-consultas',
               menuText: 'Consultas realizadas',
               allowedClientrole: ['DEPORTOLOGO_ROLE']
           },
           {
               to: '/deportologo/generar-reportes',
               menuText: 'Generación de reportes',
               allowedClientrole: ['DEPORTOLOGO_ROLE']
           },
           {
               to: '/consultor/usuarios-registrados',
               menuText: 'Usuarios registrados',
               allowedClientrole: ['CONSULTOR_ROLE']
           },
           {
               to: '/consultor/generar-reportes',
               menuText: 'Generación de reportes',
               allowedClientrole: ['CONSULTOR_ROLE']
           },
           {
               to: '/administrador/usuarios-registrados',
               menuText: 'Usuarios registrados',
               allowedClientrole: ['ADMINISTRADOR_ROLE']
           },
           {
               to: '/administrador/registrar-usuario',
               menuText: 'Registrar usuario',
               allowedClientrole: ['ADMINISTRADOR_ROLE']
           },
           {
               to: '/administrador/generar-permisos',
               menuText: 'Generar permisos',
               allowedClientrole: ['ADMINISTRADOR_ROLE']
           },
           {
               to: '/administrador/generar-disciplinas',
               menuText: 'Disciplinas deportivas',
               allowedClientrole: ['ADMINISTRADOR_ROLE']
           },
           {
               to: '/administrador/generar-reportes',
               menuText: 'Generación de reportes',
               allowedClientrole: ['ADMINISTRADOR_ROLE']
           }
       ];
