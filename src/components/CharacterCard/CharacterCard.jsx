import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import FavIconSelected from '@assets/fav-selected.svg';
import FavIconUnselected from '@assets/fav-unselected.svg';
import { HeroesContext } from '@context/HeroesContext.jsx';

import './index.scss';

const CharacterCard = ({ character }) => {
  const { favoriteHeroes, toggleFavoriteHero } = useContext(HeroesContext);
  const navigate = useNavigate();

  const isFavorite = favoriteHeroes.includes(character.id);

  // Función que se ejecuta al hacer click en la card
  const handleCardClick = () => {
    navigate(`/character/${character.id}`, { state: { character } });
  };

  return (
    <div className="character-card" onClick={handleCardClick}>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="character-card__image"
      />

      <div className="character-card__info">
        <div className="character-card__line"></div>
        <div className="character-card__description">
          <h2 className="character-card__name">
            {character.name?.toUpperCase()}
          </h2>
          {/* Añadimos la stopPropagation para evitar que el evento llegue al padre */}
          <div
            className="character-card__favorites"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={isFavorite ? FavIconSelected : FavIconUnselected}
              alt="Favorite icon"
              className="card__favorites-icon"
              width={12}
              onClick={() => {
                toggleFavoriteHero(character);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CharacterCard;
