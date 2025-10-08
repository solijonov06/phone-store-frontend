import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { STORE } from './STORE';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider STORE={STORE}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});