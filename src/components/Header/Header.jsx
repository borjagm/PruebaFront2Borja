import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MarvelLogo from '@assets/marvel-logo.png';
import FavIcon from '@assets/fav-selected.svg';
import { HeroesContext } from '@context/HeroesContext.jsx';

import './index.scss';

export default function Header() {
  const {
    favoriteHeroes,
    toggleShowFavorites,
    clearFavoriteFilter,
    showFavorites,
  } = useContext(HeroesContext);
  const favoriteCount = favoriteHeroes?.length;
  const location = useLocation();
  const navigate = useNavigate();

  // Función para que no busque héroes favoritos si no hay ninguno
  const handleToggleFavorites = () => {
    if (favoriteCount > 0) {
      if (location.pathname !== '/') {
        navigate('/');
        if (!showFavorites) {
          toggleShowFavorites();
        }
      } else if (!showFavorites) {
        toggleShowFavorites();
      }
    }
  };

  // Función para manejar el clic en el logo de Marvel
  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      clearFavoriteFilter();
      navigate('/');
    } else {
      clearFavoriteFilter();
    }
  };

  return (
    <header className="header">
      <img
        src={MarvelLogo}
        alt="Marvel logo"
        className="header__logo"
        onClick={handleLogoClick}
      />
      <div className="header__favorites" onClick={handleToggleFavorites}>
        <img
          src={FavIcon}
          alt="Favorite icon"
          className="header__favorites-icon"
        />
        <span className="header__favorites-count">{favoriteCount}</span>
      </div>
    </header>
  );
}
