import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroesContext } from '@context/HeroesContext.jsx';
import FavSelected from '@assets/fav-selected.svg';
import FavUnselected from '@assets/fav-unselected.svg';
import { Comics } from './components/Comics/Comics';

import './index.scss';

const CharacterDetail = () => {
  const location = useLocation();
  const { character } = location.state;
  const { fetchHeroComics, favoriteHeroes, toggleFavoriteHero } =
    useContext(HeroesContext);
  const [comics, setComics] = useState([]);

  const isFavorite = favoriteHeroes.includes(character.id);

  useEffect(() => {
    const getComics = async () => {
      const comicsData = await fetchHeroComics(character.id);
      setComics(comicsData);
    };

    getComics();
  }, [character.id]);

  return (
    <div className="character-detail">
      <div className="character-detail__info">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="character-detail__info__image"
        />
        <div className="character-detail__info__text">
          <div className="character-detail__info__text__header">
            <p className="character-detail__info__text__header__name">
              {character.name}
            </p>
            <img
              src={isFavorite ? FavSelected : FavUnselected}
              alt="Favorite icon"
              className="character-detail__info__text__header__favicon"
              width={24}
              onClick={() => {
                toggleFavoriteHero(character);
              }}
            />
          </div>
          <p className="character-detail__info__text__desc">
            {character.description}
          </p>
        </div>
      </div>
      <Comics comics={comics} />
    </div>
  );
};

export default CharacterDetail;
