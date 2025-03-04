import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './../App.jsx';

describe('Tests de Main', () => {
  it('Renderización de la app sin crashear', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    expect(root).toBeInTheDocument();
  });
});