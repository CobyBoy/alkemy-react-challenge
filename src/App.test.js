import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

describe('AppComponent', () => {
  it('renders lwithout crashing', () => {
    const app = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(app).not.toBe(null);
  });
});

