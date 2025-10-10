/**
 * Mapa centralizado de errores para RegistroMan
 * Cada clave es un fragmento del mensaje de error a buscar
 * Cada valor contiene el status HTTP y el mensaje de respuesta
 */
const REGISTRO_MAN_ERROR_MAP = {
    // Errores comunes de validación
    'Todos los campos son obligatorios': { status: 400, message: 'Todos los campos son obligatorios' },
    'ID del documento y usuario son obligatorios': { status: 400, message: 'Faltan campos obligatorios' },
    'ID del documento y razón son obligatorios': { status: 400, message: 'ID del documento y razón son obligatorios' },
    'Código, nueva versión y vigencia son obligatorios': { status: 400, message: 'Código, nueva versión y vigencia son obligatorios' },

    // Errores de formato/validación
    'ID del documento debe ser un número válido': { status: 400, message: 'ID del documento inválido' },
    'El usuario no puede estar vacío': { status: 400, message: 'Usuario inválido' },
    'El usuario no puede exceder 75 caracteres': { status: 400, message: 'Usuario excede la longitud máxima permitida' },
    'Formato de código inválido': { status: 400, message: 'Formato de código inválido. Use RM-###' },
    'Código inválido': { status: 400, message: 'Formato de código inválido. Use RM-###' },

    // Errores de existencia/no encontrado
    'documento no existe': { status: 404, message: 'El documento especificado no existe' },
    'Código RM no existe': { status: 404, message: 'El código RM especificado no existe' },
    'Registro MAN no encontrado': { status: 404, message: 'Registro MAN no encontrado' },
    'id_documento no pertenece a REGISTRO': { status: 404, message: 'Registro MAN no encontrado' },

    // Errores de estado/conflicto
    'documento ya está obsoleto': { status: 409, message: 'El documento ya está marcado como obsoleto' },
    'documento ya está activo': { status: 409, message: 'El documento ya está activo/vigente' },
    'No hay versión vigente para ese RM': { status: 400, message: 'No existe una versión vigente para este registro MAN' },
    'Faltan colaboradores por capacitar': { status: 409, message: 'No se puede realizar la acción: faltan colaboradores por capacitar en la versión actual' },
    'no se puede reactivar': { status: 409, message: 'El registro no se puede reactivar en este momento' },
    'Ya existe otro REGISTRO': { status: 409, message: 'El código ya existe para otro registro' },
    'ya existe para este RM': { status: 409, message: 'La versión ya existe para este registro' },
    'Debe quedar al menos una versión vigente': { status: 400, message: 'Debe quedar al menos una versión vigente del RM' },

    // Errores de tipo de documento
    'no es un registro MAN': { status: 400, message: 'El documento especificado no es un registro MAN válido' },

    // Errores de referencia
    'FK inválida': { status: 400, message: 'Referencia inválida en los datos' },

    // Errores de capacitación
    'tiene colaboradores sin capacitar': { status: 409, message: 'No se puede realizar la acción: existen colaboradores sin capacitar' }
};

/**
 * Maneja errores de RegistroMan de forma centralizada
 * @param {Error} error - El error capturado
 * @param {Object} res - Objeto de respuesta de Express
 * @param {string} defaultMessage - Mensaje por defecto para errores no mapeados
 * @returns {Object} Respuesta HTTP con el error apropiado
 */
const handleRegistroManError = (error, res, defaultMessage = 'Error interno del servidor') => {
    console.error('Error en RegistroMan:', error);

    // Buscar el error correspondiente en el mapa
    const errorKey = Object.keys(REGISTRO_MAN_ERROR_MAP).find(key =>
        error.message.includes(key)
    );

    if (errorKey) {
        const { status, message } = REGISTRO_MAN_ERROR_MAP[errorKey];
        return res.status(status).json({ message });
    }

    // Error no mapeado - devolver error genérico 500
    return res.status(500).json({ message: defaultMessage });
};

/**
 * Versión más específica para diferentes operaciones
 * @param {Error} error - El error capturado
 * @param {Object} res - Objeto de respuesta de Express
 * @param {string} operation - Tipo de operación ('insertar', 'actualizar', 'reactivar', 'obsoleto', 'clonar')
 * @returns {Object} Respuesta HTTP con el error apropiado
 */
const handleRegistroManErrorByOperation = (error, res, operation) => {
    const defaultMessages = {
        insertar: 'Error interno del servidor al insertar registro',
        actualizar: 'Error interno del servidor al actualizar registro',
        reactivar: 'Error interno del servidor al reactivar registro',
        obsoleto: 'Error interno del servidor al marcar registro como obsoleto',
        clonar: 'Error interno del servidor al clonar versión',
        obtener: 'Error interno del servidor al obtener registros'
    };

    const defaultMessage = defaultMessages[operation] || 'Error interno del servidor';
    return handleRegistroManError(error, res, defaultMessage);
};

module.exports = {
    REGISTRO_MAN_ERROR_MAP,
    handleRegistroManError,
    handleRegistroManErrorByOperation
};
