import axios from 'axios';

/**
 * Realiza una solicitud a un endpoint externo usando allorigins.win.
 * @param {string} url - El URL del recurso externo a solicitar.
 * @param {string} [baseURL='https://api.allorigins.win/get'] - La base URL para el proxy.
 * @returns {Promise<Object>} - Devuelve el contenido JSON del recurso solicitado.
 */
export const fetchData = async (
  url,
  baseURL = 'https://api.allorigins.win/get'
) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        url,
      },
    });

    // Verificar y parsear el contenido JSON devuelto
    if (response.data && response.data.contents) {
      return JSON.parse(response.data.contents);
    }

    console.error('Contenido vacío o no disponible.');
    return null;
  } catch (error) {
    console.error('Error al recuperar los datos:', error.message);
    return null;
  }
};
