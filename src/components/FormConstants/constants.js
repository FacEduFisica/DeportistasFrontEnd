export const MESSAGE_FIELD_REQUARED =
    'Todos los campos son obligatorios, asegurese de llenar las dos partes del formulario, < y >';
export const MESSAGE_FIELD_REQUARED_GENERIC =
    'Todos los campos del formulario son obligatorios, ingrese todos los datos para poder guardar';

export const MESSAGE_FORM_SAVED =
    'El formulario ya ha sido diligenciado, si desea editar su información debe comunicarse con el admministrador para que le de permisos de edición.';

export const MESSAGE_SUCCESS_FORM =
    'El formulario ha sido guardado exitosamente!';

export const MESSAGE_SUCCESS_FORM_EDIT =
    'El formulario ha sido editado y guardado exitosamente!';

export const MESSAGE_NO_EDIT =
    'Para poder editar el formulario debe ponerse en contacto con el administrador, ya que la edicion del formulario solo se realiza una vez por semestre.';

export const MESSAGE_CLIC_EDIT_SIN_GUARDAR = `Para poder editar, primero debe diligenciar el formulario y guardarlo, tenga en cuenta que la edición del formulario se hace una vez por semestre asegurese de ingresar correctamente sus datos.`;

export const MESSAGE_FIELD_DEPORTOLOGOS =
    'Debe diligenciar todos los campos con el singo de (*) indicando que son obligatorios, para poder guardar.';

export const MESSAGE_ERROR_SERVER =
    'Ha ocurrido un error al guardar la consulta verifique que los campos obligatorios(*) se encuentren diligenciados e intente guardar de nuevo';

export const MESSAGE_NOFOUND_CEDULA =
    'Error en la consulta de la información, ingrese bien la cedula, o verifique con el paciente si ingreso sus datos perosnales!';

export const MESSAGE_NOFOUND_STUDENT =
    'El estudiante que desea buscar le falta diligenciar datos en sus formularios o no ha se le ha tenido la consulta con el deportologo, lo cual es requisito para guardar este formulario.';

// options para los dropdwon del formulario personal
export const TIPO_DOCUMENTO_OPTIONS = [
    {
        key: 'tarjetaEntidad',
        text: 'Tarjet de identidad',
        value: 'TI'
    },
    {
        key: 'cedulaCiudadania',
        text: 'Cedula de ciudadania',
        value: 'CC'
    },
    {
        key: 'cedulaExtranjera',
        text: 'Cedula de extranjería',
        value: 'CE'
    },
    {
        key: 'passaporte',
        text: 'Pasaporte',
        value: 'PS'
    },
    {
        key: 'certificadoDeCabildo',
        text: 'Certificado de cabildo',
        value: 'CA'
    }
];

export const ESTADO_CIVIL_OPTIONS = [
    {
        key: 'soltero',
        text: 'Soltero(a)',
        value: 'SOLTERO(A)'
    },
    {
        key: 'casado',
        text: 'Casado(a)',
        value: 'CASADO(A)'
    },
    {
        key: 'divorciado',
        text: 'Divorciado(a)',
        value: 'DIVORCIADO(A)'
    },
    {
        key: 'viudo',
        text: 'Viudo(a)',
        value: 'VIUDO(A)'
    },
    {
        key: 'unionLibre',
        text: 'Unión libre',
        value: 'UNION-LIBRE'
    },
    {
        key: 'separado',
        text: 'Separado(a)',
        value: 'SEPARADO(A)'
    }
];

export const SEXO_OPTIONS = [
    {
        key: 'masculino',
        text: 'Masculino',
        value: 'MASCULINO'
    },
    {
        key: 'femenino',
        text: 'Femenino',
        value: 'FEMENINO'
    }
];

export const SEGURIDAD_SOCIAL_OPTIONS = [
    {
        key: 'sisben',
        text: 'SISBEN',
        value: 'SISBEN'
    },
    {
        key: 'ars',
        text: 'ARS',
        value: 'ARS'
    },
    {
        key: 'eps',
        text: 'EPS',
        value: 'EPS'
    },
    {
        key: 'otro',
        text: 'OTRO',
        value: 'OTRO'
    }
];

export const GRUPO_SANGUINEO_OPTIONS = [
    {
        key: 'ab+',
        text: 'AB+',
        value: 'AB+'
    },
    {
        key: 'ab-',
        text: 'AB-',
        value: 'AB-'
    },
    {
        key: 'a+',
        text: 'A+',
        value: 'A+'
    },
    {
        key: 'a-',
        text: 'A-',
        value: 'A-'
    },
    {
        key: 'b+',
        text: 'B+',
        value: 'B+'
    },
    {
        key: 'b-',
        text: 'B-',
        value: 'B-'
    },
    {
        key: 'o+',
        text: 'O+',
        value: 'O+'
    },
    {
        key: 'o-',
        text: 'O-',
        value: 'O-'
    }
];

export const ETNIA_OPTIONS = [
    {
        key: 'mestizo',
        text: 'Mestizo',
        value: 'MESTIZO'
    },
    {
        key: 'Indigena',
        text: 'Indigena',
        value: 'INDIGENA'
    },
    {
        key: 'afroecuatoriano',
        text: 'Afroecuatoriano',
        value: 'AFROECUATORIANO'
    },
    {
        key: 'blanco',
        text: 'Blanco',
        value: 'BLANCO'
    },
    {
        key: 'montubio',
        text: 'Montubio',
        value: 'MONTUBIO'
    }
];

export const TIPO_DISCAPACIDAD_OPTIONS = [
    {
        key: 'ninguna',
        text: 'Ninguna',
        value: 'NINGUNA'
    },
    {
        key: 'fisica',
        text: 'Fisica',
        value: 'FISICA'
    },
    {
        key: 'sensorial',
        text: 'Sensorial',
        value: 'SENSORIAL'
    },
    {
        key: 'intelectual',
        text: 'Intelectual',
        value: 'INTELECTUAL'
    },
    {
        key: 'psiquica',
        text: 'Psiquica',
        value: 'PSIQUICA'
    },
    {
        key: 'visceral',
        text: 'Visceral',
        value: 'VISCERAL'
    },
    {
        key: 'multiple',
        text: 'Multiple',
        value: 'MULTIPLE'
    }
];

export const RESPUESTA_DOBLE = [
    {
        key: 'si',
        text: 'Si',
        value: 'SI'
    },
    {
        key: 'no',
        text: 'No',
        value: 'NO'
    }
];

// opciones de los dropdwon del formulario acaemico
export const TIPO_ASPIRANTE = [
    {
        key: 'nuevo',
        text: 'Nuevo',
        value: 'NUEVO'
    },
    {
        key: 'reingreso',
        text: 'Reingreso',
        value: 'REINGRESO'
    },
    {
        key: 'transferenciaInterna',
        text: 'Transferencia interna',
        value: 'TRANSFERENCIA-INTERNA'
    },
    {
        key: 'transferenciaExterna',
        text: 'Transferencia externa',
        value: 'TRANSFERENCIA-EXTERNA'
    },
    {
        key: 'cicloPropedeutico',
        text: 'Ciclo propedeutico',
        value: 'CICLO-PROPEDEUTICO'
    },
    {
        key: 'otro',
        text: 'Otro',
        value: 'OTRO'
    }
];

export const SEMESTRE_ACTUAL = [
    {
        key: '1',
        text: '1',
        value: '1'
    },
    {
        key: '2',
        text: '2',
        value: '2'
    },
    {
        key: '3',
        text: '3',
        value: '3'
    },
    {
        key: '4',
        text: '4',
        value: '4'
    },
    {
        key: '5',
        text: '5',
        value: '5'
    },
    {
        key: '6',
        text: '6',
        value: '6'
    },
    {
        key: '7',
        text: '7',
        value: '7'
    },
    {
        key: '8',
        text: '8',
        value: '8'
    },
    {
        key: '9',
        text: '9',
        value: '9'
    },
    {
        key: '10',
        text: '10',
        value: '10'
    }
];

export const FACULTAD_VALIDA = [
    {
        key: 'administracion',
        text: 'Administración',
        value: 'ADMINISTRACION'
    },
    {
        key: 'cienciasAgrarias',
        text: 'Ciencias agrarias',
        value: 'CIENCIAS-AGRARIAS'
    },
    {
        key: 'cienciasBasicas',
        text: 'Ciencias básicas',
        value: 'CIENCIAS-BASICAS'
    },
    {
        key: 'comunicacionAudiovisual',
        text: 'Comunicación audiovisual',
        value: 'COMUNICACION-AUDIOVISUAL'
    },
    {
        key: 'educacionFisica',
        text: 'Educación fisica',
        value: 'EDUCACION-FISICA'
    },
    {
        key: 'ingenieria',
        text: 'Ingenieria',
        value: 'INGENIERIA'
    }
];

export const SEDE_VALIDA = [
    {
        key: 'medellin',
        text: 'Medellín',
        value: 'MEDELLÍN'
    },
    {
        key: 'rionegro',
        text: 'Rionegro',
        value: 'RIONEGRO'
    },
    {
        key: 'apartado',
        text: 'Apartadó',
        value: 'APARTADÓ'
    }
];

// optios para el formulario deportivo
export const GENEROS_VALIDOS = [
    {
        key: 'masculino',
        text: 'Masculino',
        value: 'MASCULINO'
    },
    {
        key: 'femenino',
        text: 'Femenino',
        value: 'FEMENINO'
    }
];

export const TIPO_DEPORTISTA_VALIDO = [
    {
        key: 'representativo',
        text: 'Representativo',
        value: 'REPRESENTATIVO'
    },
    {
        key: 'formativo',
        text: 'Formativo',
        value: 'FORMATIVO'
    },
    {
        key: 'profesional',
        text: 'Profesional',
        value: 'PROFESIONAL'
    },
    {
        key: 'amateur',
        text: 'Amateur',
        value: 'AMATEUR'
    }
];

export const NIVEL_DEPORTIVO_VALIDO = [
    {
        key: 'club',
        text: 'Club',
        value: 'CLUB'
    },
    {
        key: 'seleccionDepartamental',
        text: 'Selección departamental',
        value: 'SELECCION-DEPARTAMENTAL'
    },
    {
        key: 'seleccionNacional',
        text: 'Seleccón nacional',
        value: 'SELECCION-NACIONAL'
    }
];

export const CICLO_OLIMPICO_VALIDO = [
    {
        key: 'panamericano',
        text: 'Panamericano',
        value: 'PANAMERICANO'
    },
    {
        key: 'suramericano',
        text: 'Suramericano',
        value: 'SURAMERICANO'
    },
    {
        key: 'bolivariano',
        text: 'Bolivariano',
        value: 'BOLIVARIANO'
    },
    {
        key: 'mundial',
        text: 'Mundial',
        value: 'MUNDIAL'
    },
    {
        key: 'preolimpico',
        text: 'Preolímpico',
        value: 'PREOLIMPICO'
    },
    {
        key: 'noAplica',
        text: 'No aplica',
        value: 'NO-APLICA'
    }
];

export const TIPO_DE_ESTUDIO = [
    {
        key: 'pregrado',
        text: 'Pregrado',
        value: 'PREGRADO'
    },
    {
        key: 'postgrado',
        text: 'Postgrado',
        value: 'POSTGRADO'
    }
];

export const POSITIVO_NEGATIVO = [
    {
        key: 'positivo',
        text: 'Positivo',
        value: 'SI'
    },
    {
        key: 'negativo',
        text: 'Negativo',
        value: 'NO'
    }
];

export const ANTECEDENTES_PERSONALES = [
    {
        key: 'traumaticos',
        text: 'Traumáticos',
        value: 'TRAUMÁTICOS'
    },
    {
        key: 'quirurgicos',
        text: 'Quirúrgicos',
        value: 'QUIRÚRGICOS'
    },
    {
        key: 'farmacologicos',
        text: 'Farmacólogicos',
        value: 'FARMACÓLOGICOS'
    },
    {
        key: 'patologicos',
        text: 'Patólogicos',
        value: 'PATÓLOGICOS'
    },
    {
        key: 'ninguno',
        text: 'Ninguno',
        value: 'NINGUNO'
    }
];

export const RESET_FORM_FISIO = {
    nombres: '',
    tipoDocumento: '',
    numeroDocumento: '',
    sexo: '',
    edad: '',
    talla: '',
    peso: '',
    fechaNacimiento: '',
    celular: '',
    correo: '',
    facultad: '',
    programaAcademico: '',
    semestre: '',
    eps: '',
    disciplinaDeportiva: '',
    diagnosticoMedico: '',
    medicoRemite: '',
    recomendacionMedica: '',
    fechaIngreso: '',
    antecedentesPersonales: '',
    evaluacionInicial: '',
    estadoPiel: '',
    sensibilidad: '',
    dolor: '',
    arcosMovilidad: '',
    fuerzaMuscular: '',
    flexibilidad: '',
    pruebasSimiologicas: '',
    posturaMarcha: '',
    observaciones: '',
    planTratamiento: '',
    cedulaFisioterapeuta: ''
};

export const RESET_FORM_DEPORTOLOGO = {
    deportistaId: '',
    deportologoId: '',
    responsable: '',
    telefonoResponsable: '',
    parentesco: '',
    acompanante: '',
    telefonoAcompanante: '',
    motivoConsulta: '',
    sistemaCabezaCuello: '',
    sistemaOftalmologico: '',
    sistemaOtorrino: '',
    sistemaMaxilofacial: '',
    sistemaPulmonar: '',
    sistemaAbdomen: '',
    sistemaUrinario: '',
    sistemaMusculoEsqueletico: '',
    sistemaPiel: '',
    sistemaHematologico: '',
    sistemaMetabolico: '',
    sistemaNeurologico: '',
    sistemaVascular: '',
    sistemaOtros: '',
    sistemaObservaciones: '',
    antecedenteCardioTabaquismo: '',
    antecedenteCardioTabaquismoCantidad: '',
    antecedenteCardioDislipidemia: '',
    antecedenteCardioSedentario: '',
    antecedenteCardioObesidad: '',
    antecedenteCardioHipertension: '',
    antecedenteCardioCoronaria: '',
    antecedenteCardioSoplo: '',
    antecedenteCardioArritmia: '',
    antecedenteCardioDiabetes: '',
    antecedenteCardioOtros: '',
    antecedenteCardioObservaciones: '',
    antecedenteDeporDesmayo: '',
    antecedenteDeporProblemaEjercicio: '',
    antecedenteDeporCardio: '',
    antecedenteDeporPulmonar: '',
    antecedenteDeporLesion: '',
    antecedenteDeporOtros: '',
    antecedenteDeporObservaciones: '',
    antecedenteGralMedicamento: '',
    antecedenteGralAlergia: '',
    antecedenteFamiliares: '',
    antecedenteGineco: '',
    examenFisico: '',
    antropometriaPeso: '',
    antropometriaTalla: '',
    antropometriaCalificacion: '',
    antropometriaImc: '',
    antropometriaPesoImc: '',
    frecuenciaCardiacaReposo: '',
    presionArterialSistolica: '',
    presionArterialDiastolica: '',
    riesgoFramiPorcentaje: '',
    riesgoFramiCalificacion: '',
    cabezaCuello: '',
    cardiopulmonar: '',
    abdomen: '',
    osteoMuscular: '',
    vascularPeriferico: '',
    pielAnexos: '',
    postura: '',
    flexibilidad: '',
    fuerza: '',
    diagnostico: '',
    opinionPlan: '',
    cedulaDeportologo: ''
};
export const ROLELIST = [
    {
        key: '1',
        text: 'Administrador',
        value: 'ADMINISTRADOR_ROLE'
    },
    {
        key: '2',
        text: 'Estudiante',
        value: 'ESTUDIANTE_ROLE'
    },
    {
        key: '3',
        text: 'Fisioterapeuta',
        value: 'FISIOTERAPEUTA_ROLE'
    },
    {
        key: '4',
        text: 'Entrenador',
        value: 'ENTRENADOR_ROLE'
    },
    {
        key: '5',
        text: 'Deportologo',
        value: 'DEPORTOLOGO_ROLE'
    },
    {
        key: '6',
        text: 'Consultor',
        value: 'CONSULTOR_ROLE'
    }
];
