import React, { useContext } from 'react';
import { HeroesContext } from '@context/HeroesContext';
import CharacterCard from '@components/CharacterCard/CharacterCard';

import './index.scss';

function Home() {
  const { heroes, filterFavoriteHeroes, showFavorites } =
    useContext(HeroesContext);

  const displayedHeroes = showFavorites ? filterFavoriteHeroes() : heroes;

  return (
    <div className="home">
      <div className="hero-cards-container">
        {displayedHeroes.map((hero) => (
          <CharacterCard key={hero.id} character={hero} />
        ))}
      </div>
    </div>
  );
}

export default Home;