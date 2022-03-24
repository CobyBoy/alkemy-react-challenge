import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { Provider } from 'react-redux';
import {store} from '../../store/store';

beforeEach(() => {
  render(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
});

describe('LoginPageComponent', () => {
  it('should render without crashing', () => {
    const app = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(app).not.toBe(null);
  });
  it('should display login title', () => {
    const headingTitle = screen.getByRole('heading', {
      name: /login page\. welcome to blah blah blah/i,
    });
    expect(headingTitle).toBeInTheDocument();
  });
  it('should render LoginFormComponent', () => {
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

}); 