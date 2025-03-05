import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Comics } from '@pages/CharacterDetail/components/Comics/Comics';

const mockComics = [
  {
    id: 1,
    title: 'Amazing Spider-Man',
    thumbnail: {
      path: 'comic1',
      extension: 'jpg',
    },
    dates: [{ type: 'onsaleDate', date: '2020-01-01T00:00:00Z' }],
  },
  {
    id: 2,
    title: 'Amazing Spider-Man Parte 2',
    thumbnail: {
      path: 'comic2',
      extension: 'jpg',
    },
    dates: [{ type: 'onsaleDate', date: '2021-01-01T00:00:00Z' }],
  },
];

describe('Componente Comics', () => {
  test('renders comics correctly', () => {
    render(<Comics comics={mockComics} />);

    // Verificamos que los títulos de los cómics se renderizan correctamente
    expect(screen.getByText('Amazing Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Amazing Spider-Man Parte 2')).toBeInTheDocument();

    // Verificamos que las imágenes de los cómics se renderizan con el src correcto
    expect(screen.getByAltText('Amazing Spider-Man')).toHaveAttribute(
      'src',
      'comic1.jpg'
    );
    expect(screen.getByAltText('Amazing Spider-Man Parte 2')).toHaveAttribute(
      'src',
      'comic2.jpg'
    );

    // Verificamos que los años de venta se renderizan correctamente
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });
});
