import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { HeroesContext } from '@context/HeroesContext.jsx';
import CharacterDetail from '@pages/CharacterDetail/CharacterDetail';

const mockCharacter = {
  id: 1,
  name: 'Spider-Man',
  description: 'Tu amigo y vecino Spiderman',
  thumbnail: {
    path: 'spiderfoto',
    extension: 'jpg',
  },
};

const mockComics = [
  {
    id: 1,
    title: 'Amazing Spider-Man',
    thumbnail: {
      path: 'spiderComic',
      extension: 'jpg',
    },
    dates: [{ type: 'onsaleDate', date: '2020-01-01T00:00:00Z' }],
  },
  {
    id: 2,
    title: 'Amazing Spider-Man Parte 2',
    thumbnail: {
      path: 'SpiderComic2',
      extension: 'jpg',
    },
    dates: [{ type: 'onsaleDate', date: '2020-01-01T00:00:00Z' }],
  },
];

const mockFetchHeroComics = vi.fn().mockResolvedValue(mockComics);
const mockToggleFavoriteHero = vi.fn();

const renderComponent = (character) => {
  render(
    <MemoryRouter initialEntries={[{ state: { character } }]}>
      <HeroesContext.Provider
        value={{
          fetchHeroComics: mockFetchHeroComics,
          favoriteHeroes: [character.id],
          toggleFavoriteHero: mockToggleFavoriteHero,
        }}
      >
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </HeroesContext.Provider>
    </MemoryRouter>
  );
};

describe('Componente CharacterDetail', () => {
  test('Renderiza correctamente el detalle', async () => {
    await act(async () => {
      renderComponent(mockCharacter);
    });

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockCharacter.name)).toHaveAttribute(
      'src',
      `${mockCharacter.thumbnail.path}.${mockCharacter.thumbnail.extension}`
    );

    expect(await screen.findByText(mockComics[0].title)).toBeInTheDocument();
  });

  test('Cambia el estado de favorito cuando se hace clic en el icono de favorito', async () => {
    await act(async () => {
      renderComponent(mockCharacter);
    });

    const favoriteIcon = screen.getByAltText('Favorite icon');
    await act(async () => {
      fireEvent.click(favoriteIcon);
    });

    expect(mockToggleFavoriteHero).toHaveBeenCalledWith(mockCharacter);
  });

  test('Renderiza correctamente el segundo comic del mock', async () => {
    await act(async () => {
      renderComponent(mockCharacter);
    });

    expect(await screen.findByText(mockComics[1].title)).toBeInTheDocument();
    expect(screen.getByAltText(mockComics[1].title)).toHaveAttribute(
      'src',
      `${mockComics[1].thumbnail.path}.${mockComics[1].thumbnail.extension}`
    );
  });
});