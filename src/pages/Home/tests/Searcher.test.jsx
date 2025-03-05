import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Searcher from '../components/Searcher/Searcher';
import { describe, expect, test, vi } from 'vitest';

describe('Searcher Component', () => {
  test('renders Searcher component', () => {
    render(<Searcher onSearch={() => {}} resultsCount={0} />);
    expect(
      screen.getByPlaceholderText('SEARCH A CHARACTER')
    ).toBeInTheDocument();
    expect(screen.getByAltText('search icon')).toBeInTheDocument();
  });

  test('calls onSearch when input value changes', () => {
    const onSearchMock = vi.fn();
    render(<Searcher onSearch={onSearchMock} resultsCount={0} />);
    const input = screen.getByPlaceholderText('SEARCH A CHARACTER');
    fireEvent.change(input, { target: { value: 'Spiderman' } });
    expect(onSearchMock).toHaveBeenCalledWith('Spiderman');
  });

  test('displays the correct results count', () => {
    render(<Searcher onSearch={() => {}} resultsCount={5} />);
    expect(screen.getByText('5 RESULTS')).toBeInTheDocument();
  });
});
