import React, { useState } from 'react';
import SearchIcon from '@assets/search-icon.svg';

import './index.scss';

const Searcher = ({onSearch, resultsCount}) => {
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        onSearch(value);
    }

  return (
    <>
        <div className="searcher-container">
            <img src={SearchIcon} alt="search icon" />
            <input
                type="text"
                className="searcher-input"
                placeholder="SEARCH A CHARACTER"
                value={search}
                onChange={handleChange}
            /> 
        </div>
        <div className="searcher-results-count">
            {resultsCount} RESULTS
        </div>
    </>
  );
};

export default Searcher;