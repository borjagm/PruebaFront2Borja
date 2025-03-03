import React, { useContext } from 'react';
import MarvelLogo from '@assets/marvel-logo.png';
import FavIcon from '@assets/fav-selected.svg';
import { HeroesContext } from '@context/HeroesContext.jsx';

import './index.scss';

export default function Header() {
  const { favoriteHeroes, toggleShowFavorites, clearFavoriteFilter } =
    useContext(HeroesContext);
  const favoriteCount = favoriteHeroes?.length;

  // Función para que no busque héroes favoritos si no hay ninguno
  const handleToggleFavorites = () => {
    if (favoriteCount > 0) {
      toggleShowFavorites();
    }
  };

  return (
    <header className="header">
      <img
        src={MarvelLogo}
        alt="Marvel logo"
        className="header__logo"
        onClick={clearFavoriteFilter}
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
