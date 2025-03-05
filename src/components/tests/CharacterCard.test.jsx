import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HeroesContext } from '@context/HeroesContext.jsx';
import CharacterCard from '@components/CharacterCard/CharacterCard';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockCharacter = {
  id: 1,
  name: 'Spiderman',
  description: 'Tu amigo y vecino Spiderman',
  thumbnail: {
    path: 'spiderfoto',
    extension: 'jpg',
  },
};

const mockHeroesContext = {
  favoriteHeroes: [1],
  toggleFavoriteHero: vi.fn(),
};

const renderComponent = (character) => {
  render(
    <Router>
      <HeroesContext.Provider value={mockHeroesContext}>
        <CharacterCard character={character} />
      </HeroesContext.Provider>
    </Router>
  );
};

describe('CharacterCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Muestra correctamente los detalles de los personajes', () => {
    renderComponent(mockCharacter);

    expect(screen.getByAltText(mockCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(mockCharacter.name.toUpperCase())
    ).toBeInTheDocument();
  });

  test('Navega a la página de detalles del personaje al hacer clic en la card', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    renderComponent(mockCharacter);

    fireEvent.click(screen.getByText(mockCharacter.name.toUpperCase()));

    expect(mockNavigate).toHaveBeenCalledWith(
      `/character/${mockCharacter.id}`,
      { state: { character: mockCharacter } }
    );
  });

  test('Cambia el estado de favorito al hacer clic en el icono de favorito', () => {
    renderComponent(mockCharacter);

    const favoriteIcon = screen.getByAltText('Favorite icon');
    fireEvent.click(favoriteIcon);

    expect(mockHeroesContext.toggleFavoriteHero).toHaveBeenCalledWith(
      mockCharacter
    );
  });

  test('No navega a la página de detalles del personaje al hacer clic en el icono de favorito', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    renderComponent(mockCharacter);

    const favoriteIcon = screen.getByAltText('Favorite icon');
    fireEvent.click(favoriteIcon);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
