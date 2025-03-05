import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Comics = ({ comics }) => {
  const getOnSaleYear = (dates) => {
    const onSaleDate = dates.find((date) => date.type === 'onsaleDate');
    return onSaleDate ? new Date(onSaleDate.date).getFullYear() : 'N/A';
  };

  return (
    <div className="character-detail__comics">
      <p className="character-detail__comics__title">COMICS</p>
      <ul className="character-detail__comics__list">
        {comics.map((comic) => (
          <li key={comic.id} className="character-detail__comics__list__item">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              width={100}
            />
            <p className="character-detail__comics__list__item__title">
              {comic.title}
            </p>
            <p className="character-detail__comics__list__item__year">
              {getOnSaleYear(comic.dates)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Comics.propTypes = {
  comics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.shape({
        path: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
      }).isRequired,
      dates: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
