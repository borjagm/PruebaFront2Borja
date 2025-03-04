import axios from 'axios';

/**
 * Realiza una solicitud a un endpoint externo.
 * @param {string} url - El URL del recurso externo a solicitar.
 * @returns {Promise<Object>} - Devuelve el contenido JSON del recurso solicitado.
 */
export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);

    // Verificar y parsear el contenido JSON devuelto
    if (response.data) {
      return response.data;
    }

    console.error('Contenido vacío o no disponible.');
    return null;
  } catch (error) {
    console.error('Error al recuperar los datos:', error.message);
    return null;
  }
};
