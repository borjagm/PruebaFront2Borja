// Usamos dotenv para cargar las variables de entorno en Node.js
import dotenv from 'dotenv';
if (
  typeof window === 'undefined' &&
  typeof globalThis !== 'undefined' &&
  globalThis.process &&
  globalThis.process.env
) {
  dotenv.config({ path: '.env.keys' });
}

// Usamos crypto-js para generar un hash de la API de Marvel
import CryptoJS from 'crypto-js';

// Configuraciones de la aplicación
export const MARVEL_API_BASE_URL = 'http://gateway.marvel.com/v1/public';
export const MARVEL_API_PUBLIC_KEY = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;
export const MARVEL_API_PRIVATE_KEY = import.meta.env
  .VITE_MARVEL_API_PRIVATE_KEY;

// Función para obtener los parámetros de autenticación de la API de Marvel
const getAuthParams = () => {
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(
    ts + MARVEL_API_PRIVATE_KEY + MARVEL_API_PUBLIC_KEY
  ).toString();
  return `ts=${ts}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash}`;
};

export const getHeroesUrl = (limit = 20, offset = 0) =>
  `${MARVEL_API_BASE_URL}/characters?${getAuthParams()}&limit=${limit}&offset=${offset}`;

export const getHeroDetailUrl = (heroId) =>
  `${MARVEL_API_BASE_URL}/characters/${heroId}?${getAuthParams()}`;

export const getHeroComicsUrl = (heroId, limit = 20) => 
  `${MARVEL_API_BASE_URL}/characters/${heroId}/comics?${getAuthParams()}&limit=${limit}`;
