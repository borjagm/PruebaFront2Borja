import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HeroesContext } from '@context/HeroesContext.jsx';
import Header from '@components/Header/Header';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const mockHeroesContext = {
  favoriteHeroes: [{ id: 1, name: 'Spider-Man' }],
  toggleShowFavorites: vi.fn(),
  clearFavoriteFilter: vi.fn(),
  showFavorites: false,
};

const renderComponent = () => {
  render(
    <MemoryRouter>
      <HeroesContext.Provider value={mockHeroesContext}>
        <Header />
      </HeroesContext.Provider>
    </MemoryRouter>
  );
};

describe('Componente Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Renderiza el logotipo de Marvel y el recuento de favoritos', () => {
    renderComponent();

    expect(screen.getByAltText('Marvel logo')).toBeInTheDocument();
    expect(screen.getByAltText('Favorite icon')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('Navega a la página de inicio y borra el filtro de favoritos al hacer clic en el logotipo', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/character' });

    renderComponent();

    fireEvent.click(screen.getByAltText('Marvel logo'));

    expect(mockHeroesContext.clearFavoriteFilter).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('Muestra los héroes favoritos al hacer clic en el icono de favoritos', () => {
    useLocation.mockReturnValue({ pathname: '/' });

    renderComponent();

    fireEvent.click(screen.getByAltText('Favorite icon'));

    expect(mockHeroesContext.toggleShowFavorites).toHaveBeenCalled();
  });

  test('No muestra los héroes favoritos al hacer clic en el icono de favoritos si no hay favoritos', () => {
    mockHeroesContext.favoriteHeroes = [];
    useLocation.mockReturnValue({ pathname: '/' });

    renderComponent();

    fireEvent.click(screen.getByAltText('Favorite icon'));

    expect(mockHeroesContext.toggleShowFavorites).not.toHaveBeenCalled();
  });
});
