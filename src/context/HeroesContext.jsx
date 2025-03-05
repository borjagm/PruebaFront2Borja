import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '@services/ApiServices';
import PropTypes from 'prop-types';
import { getHeroesUrl, getHeroComicsUrl } from '@services/SiteConfig';

export const HeroesContext = createContext();

export const HeroesProvider = ({ children }) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteHeroes, setFavoriteHeroes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchHeroes = async () => {
    try {
      setLoading(true);
      const lastFetch = localStorage.getItem('lastFetch');
      const now = new Date().getTime();

      // Controlar que la última vez que se hizo la petición no haya sido hace más de 24 horas
      if (lastFetch && now - lastFetch < 24 * 60 * 60 * 1000) {
        const cachedHeroes = JSON.parse(localStorage.getItem('heroes'));
        if (cachedHeroes) {
          setHeroes(cachedHeroes);
          return cachedHeroes;
        }
      }

      const data = await fetchData(getHeroesUrl(50, 0));
      const heroesList = data.data.results || [];
      setHeroes(heroesList);

      // Guardar los heroes en el almacenamiento local
      localStorage.setItem('heroes', JSON.stringify(heroesList));
      localStorage.setItem('lastFetch', now);

      return heroesList;
    } catch (err) {
      setError('Failed to load heroes: ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
    const cachedFavorites = JSON.parse(localStorage.getItem('favoriteHeroes'));
    if (cachedFavorites) {
      setFavoriteHeroes(cachedFavorites);
    }
  }, []);

  // Función para obtener los cómics de un héroe por su id
  const fetchHeroComics = async (heroId) => {
    try {
      setLoading(true);
      const url = getHeroComicsUrl(heroId);
      const data = await fetchData(url);
      // Variable comics para ordenar los comics por fecha de lanzamiento
      const comics = data.data.results;

      comics?.sort((a, b) => {
        const dateA = new Date(
          a.dates.find((date) => date.type === 'onsaleDate').date
        );
        const dateB = new Date(
          b.dates.find((date) => date.type === 'onsaleDate').date
        );
        return dateA - dateB;
      });

      return comics;
    } catch (err) {
      setError('Failed to fetch hero comics:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Función para marcar/desmarcar héroes como favoritos
  const toggleFavoriteHero = (hero) => {
    const isFavorite = favoriteHeroes.includes(hero.id);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favoriteHeroes.filter((id) => id !== hero.id);
    } else {
      updatedFavorites = [...favoriteHeroes, hero.id];
    }
    setFavoriteHeroes(updatedFavorites);
    localStorage.setItem('favoriteHeroes', JSON.stringify(updatedFavorites));
  };

  // Función para filtrar los héroes favoritos
  const filterFavoriteHeroes = () => {
    return heroes.filter((hero) => favoriteHeroes.includes(hero.id));
  };

  // Función para mostrar/ocultar los héroes favoritos
  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  // Función para limpiar el filtro de favoritos
  const clearFavoriteFilter = () => {
    setShowFavorites(false);
  };

  return (
    <HeroesContext.Provider
      value={{
        heroes,
        loading,
        error,
        fetchHeroComics,
        toggleFavoriteHero,
        favoriteHeroes,
        filterFavoriteHeroes,
        showFavorites,
        toggleShowFavorites,
        clearFavoriteFilter,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};

HeroesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
