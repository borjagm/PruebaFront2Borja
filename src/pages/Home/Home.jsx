import React, { useContext, useState } from 'react';
import { HeroesContext } from '@context/HeroesContext';
import CharacterCard from '@components/CharacterCard/CharacterCard';

import './index.scss';
import Searcher from './components/Searcher/Searcher';

function Home() {
  const { heroes, filterFavoriteHeroes, showFavorites } =
    useContext(HeroesContext);
  const [searchHero, setSearchHero] = useState('');

  const handleSearch = (search) => {
    setSearchHero(search);
  }

  const displayedHeroes = showFavorites ? filterFavoriteHeroes() : heroes;

  const filteredHeroes = searchHero
    ? displayedHeroes.filter((hero) =>
        hero.name.toLowerCase().includes(searchHero.toLowerCase())
      )
    : displayedHeroes;

  return (
    <div className="home">
      <div className='home-searcher'>
        <Searcher onSearch={handleSearch} resultsCount={filteredHeroes.length}/>
      </div>
      <div className="hero-cards-container">
        {filteredHeroes.map((hero) => (
          <CharacterCard key={hero.id} character={hero} />
        ))}
      </div>
    </div>
  );
}

export default Home;