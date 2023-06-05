import React from 'react';
import { render } from '@testing-library/react';
import BookList from '../BookList';

describe('BookList component', () => {
  test('should render book list correctly', () => {
    // Renderiza el componente
    const { getByTestId } = render(<BookList />);

    // Realiza las aserciones necesarias
    // Por ejemplo, verifica si un elemento específico está presente en el componente renderizado
    expect(getByTestId('book-list')).toBeInTheDocument();
  });

  test('should display book titles', () => {
    // Renderiza el componente con una lista de libros
    const books = [
      { id: 1, title: 'Book 1' },
      { id: 2, title: 'Book 2' },
    ];
    const { getByText } = render(<BookList books={books} />);

    // Realiza las aserciones necesarias
    // Por ejemplo, verifica si los títulos de los libros están presentes en el componente renderizado
    expect(getByText('Book 1')).toBeInTheDocument();
    expect(getByText('Book 2')).toBeInTheDocument();
  });
});