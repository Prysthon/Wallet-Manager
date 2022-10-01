import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
  it('Verifica se existe página de Login', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Verifica a página de carteiras', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, 'alguem@alguem.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const value = screen.getByRole('spinbutton', { name: /valor:/i });
    const totalValue = screen.getByTestId('total-field');
    const expenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(value).toBeInTheDocument();
    expect(totalValue).toBeInTheDocument();
    expect(expenseButton).toBeInTheDocument();

    userEvent.type(value, 10);
    userEvent.click(expenseButton);
  });
});
