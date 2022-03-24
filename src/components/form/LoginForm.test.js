import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import * as api from '../../services/apiService';
import MealsList from '../mealsList/MealsList';
import Search from '../search/Search';

//const loginData = { email: 'challenge@alkemy.org', password: 'react' };

const history = createMemoryHistory({ initialEntries: [''] });
beforeEach(() => {
  
  render(
    <Provider store={store}>
      <Router location={history.location}>
        <LoginForm />
      </Router>
    </Provider>
  );
});

describe('LoginFormComponent', () => {
  const onSubmit = jest.fn();
  const getEmailInput = () => { return screen.getByRole('textbox', { name: /email address/i, });};
  const getPasswordInput = () => { return screen.getByLabelText(/password/i); };
  const getSubmitButton = () => { return screen.getByRole('button', { name: /submit/i, }); };
  const getFormElement = () => { return screen.getByRole('form');}; 
  it('should render without crashing', () => {
    const app = render(
      <Provider store={store}>
        <LoginForm/>
      </Provider>
    );
    
    expect(app).not.toBe(null);
  });

  it('should display Email label', () => {
    const emailLabel = screen.getByLabelText('Email address');
    expect(emailLabel).toBeInTheDocument();
  });

  it('should display email input', () => {
    const emailInput = getEmailInput();
    expect(emailInput).toBeInTheDocument();
  });

  it('should expect email input to be required', () => {
    const emailInput = getEmailInput();
    expect(emailInput).toBeRequired();
  });

  it('should display password label', () => {
    const passwordLabel = getPasswordInput();
    expect(passwordLabel).toBeInTheDocument();
  });

  it('should display submit button', () => {
    const submitButton = getSubmitButton();
    expect(submitButton).toBeInTheDocument();
  });
    
  // it('should call submit if form is valid', async () => {
  //   let token = 'soyUnTokenLoco';
  //   let tokenMock;
  //   let spyApiService = jest.spyOn(apiServiceMock, 'startLogin');
  //   //const form = getAllByTestId('form');
  //   const button = screen.getAllByRole('button', { name: /submit/i });
  //   const emailInput = screen.getAllByPlaceholderText('challenge@alkemy.org');
  //   const passInput = screen.getAllByPlaceholderText('react');
  //   userEvent.type(emailInput[0], 'challenge@alkemy.org');
  //   userEvent.type(passInput[0], 'react');
  //   let clicked;
  //   clicked = fireEvent.click(button[0]);

  //   await waitFor(() => {
  //     tokenMock = apiServiceMock.startLogin(loginData);
  //   });
  //   //expect(fireEvent.submit(form[0])).toBe(true);
  //   expect(clicked).toBe(true);
  //   expect(spyApiService).toHaveBeenCalledWith(loginData);
  // });
  it('should show error messages if form is empty', async () => {
    const submitButton = getSubmitButton();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const form = getFormElement();
    form.onsubmit = onSubmit;
    await act(async () => {
      userEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(emailInput).toHaveErrorMessage('email required');
      expect(passwordInput).toHaveErrorMessage('password required');
    });
  });
  it('should submit if form is valid', async () => {
    const submitButton = getSubmitButton();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const form = getFormElement();
    userEvent.type(emailInput, 'challenge@alkemy.org');

    expect(emailInput).toHaveValue('challenge@alkemy.org');
    userEvent.type(passwordInput, 'react');
    expect(passwordInput).toHaveValue('react');
    form.onsubmit = onSubmit;
    await act(async () => {
      userEvent.click(submitButton);
    });
    
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
