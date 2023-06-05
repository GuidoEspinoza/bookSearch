import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SwitchTheme from '../components/header/SwitchTheme';

describe('SwitchTheme', () => {
  test('should toggle mode when clicked', () => {
    // Renderiza el componente
    const { getByTestId } = render(<SwitchTheme />);

    // Obtiene el interruptor de modo
    const switchTheme = getByTestId('switch-mode');

    // Verifica que el modo inicial sea 'light'
    expect(switchTheme.textContent).toBe('Mode: light');

    // Dispara un evento de clic en el interruptor de modo
    fireEvent.click(switchTheme);

    // Verifica que el modo cambie a 'dark' después de hacer clic
    expect(switchTheme.textContent).toBe('Mode: dark');
  });
});