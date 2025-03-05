import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../App.jsx';

describe('Componente APP', () => {
  it('Renderizamos APP sin que crashee', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('Contiene el Logo de Marvel', () => {
    const { getByAltText } = render(<App />);
    expect(getByAltText('Marvel logo')).toBeInTheDocument();
  });

  it('Contiene el Icono de Favorito', () => {
    const { getByAltText } = render(<App />);
    expect(getByAltText('Favorite icon')).toBeInTheDocument();
  });

  it('Contiene el contador de favoritos', () => {
    const { getByText } = render(<App />);
    expect(getByText('0')).toBeInTheDocument();
  });

  it('Muestra el loading en el body mientras que carga el contenido', () => {
    const { getByText } = render(<App />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
