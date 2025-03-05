import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi, test } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import { HeroesContext } from '@context/HeroesContext.jsx';

//Mockeo el componente CharacterCard para que no me de problemas el navigate con el router
vi.mock('@components/CharacterCard/CharacterCard', () => ({
    __esModule: true,
    default: ({ character }) => <div>{character.name}</div>,
}));

describe('Componente Home', () => {
  const mockHeroes = [
    { id: 1, name: 'Spiderman' },
    { id: 2, name: 'Hulk' },
  ];

  const mockFilterFavoriteHeroes = vi.fn(() => [mockHeroes[0]]);
  const mockShowFavorites = false;

  const renderHome = (contextValue) => {
    render(
      <MemoryRouter>
        <HeroesContext.Provider value={contextValue}>
          <Home />
        </HeroesContext.Provider>
      </MemoryRouter>
    );
  };

  test('Renderizado correcto con los héroes', () => {
    renderHome({
      heroes: mockHeroes,
      filterFavoriteHeroes: mockFilterFavoriteHeroes,
      showFavorites: mockShowFavorites,
    });

    expect(screen.getByText('Spiderman')).toBeInTheDocument();
    expect(screen.getByText('Hulk')).toBeInTheDocument();
  });

  test('Filtro de Héroe basado en el text input', () => {
    renderHome({
      heroes: mockHeroes,
      filterFavoriteHeroes: mockFilterFavoriteHeroes,
      showFavorites: mockShowFavorites,
    });

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Spiderman' } });

    expect(screen.getByText('Spiderman')).toBeInTheDocument();
    expect(screen.queryByText('Hulk')).not.toBeInTheDocument();
  });

  test('Muestra el favorito seleccionado', () => {
    renderHome({
      heroes: mockHeroes,
      filterFavoriteHeroes: mockFilterFavoriteHeroes,
      showFavorites: true,
    });

    expect(screen.getByText('Spiderman')).toBeInTheDocument();
    expect(screen.queryByText('Hulk')).not.toBeInTheDocument();
  });
});