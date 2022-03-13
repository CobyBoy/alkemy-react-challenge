import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { act } from 'react-dom/test-utils';

const loginData = { email: 'challenge@alkemy.org', password: 'react' };

const dispatchMock = jest.fn();
const apiServiceMock = {
  startLogin: (data) => { return 'unTokenDevueltoMock'; }
};

beforeEach(() => {
  render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
});

describe('LoginFormComponent', () => {
  it('should display Email label', () => {
    const emailLabel = screen.getByLabelText('Email address');
    expect(emailLabel).toBeInTheDocument();
  });

  it('should display email input', () => {
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
  });

  it('should expect email input to be required', () => {
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeRequired();
  });

  it('should display password label', () => {
    const passwordLabel = screen.getByLabelText('Password');
    expect(passwordLabel).toBeInTheDocument();
  });

  it('should display submit button', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should display error message if input is empty and user tries to submit', async () => {
    const loginButton = screen.getByRole('button', { name: /submit/i });
    act(() => {
      userEvent.click(loginButton);
    });
    await waitFor(() => {
      expect(screen.getByText('email required')).toBeInTheDocument();
      expect(screen.getByText('password required')).toBeInTheDocument();
    });
  });
    
  it('should not dispatch if form is not valid', async () => {
    const loginButton = screen.getByRole('button', { name: /submit/i });
    act(() => {
      userEvent.click(loginButton);

    });
    await waitFor(() => {
      expect(dispatchMock).not.toHaveBeenCalled();
    });
  });
    
  it('should call submit if form is valid', async () => {
    let token = 'soyUnTokenLoco';
    let tokenMock;
    let spyApiService = jest.spyOn(apiServiceMock, 'startLogin');
    //const form = getAllByTestId('form');
    const button = screen.getAllByRole('button', { name: /submit/i });
    const emailInput = screen.getAllByPlaceholderText('challenge@alkemy.org');
    const passInput = screen.getAllByPlaceholderText('react');
    userEvent.type(emailInput[0], 'challenge@alkemy.org');
    userEvent.type(passInput[0], 'react');
    let clicked;
    clicked = fireEvent.click(button[0]);

    await waitFor(() => {
      tokenMock = apiServiceMock.startLogin(loginData);
    });
    //expect(fireEvent.submit(form[0])).toBe(true);
    expect(clicked).toBe(true);
    expect(spyApiService).toHaveBeenCalledWith(loginData);
  });
});
