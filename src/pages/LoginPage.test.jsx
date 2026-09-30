import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import authReducer from '../features/auth/authSlice';
import LoginPage from './LoginPage';

const renderLogin = () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );
  return store;
};

describe('LoginPage', () => {
  it('validates empty credentials', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole('button', { name: /enter the archive/i }));

    expect(screen.getByText('Enter your username.')).toBeInTheDocument();
    expect(screen.getByText('Enter your password.')).toBeInTheDocument();
  });

  it('creates a demo session without storing the password', async () => {
    const user = userEvent.setup();
    const store = renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'Amina');
    await user.type(screen.getByLabelText(/password/i), 'not-persisted');
    await user.click(screen.getByRole('button', { name: /enter the archive/i }));

    expect(store.getState().auth).toEqual({ isAuthenticated: true, username: 'Amina' });
    expect(JSON.stringify(store.getState())).not.toContain('not-persisted');
  });
});
