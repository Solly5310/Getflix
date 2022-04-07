import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

afterEach(cleanup);

describe('Getflix test suite', () => {
  it('should display the home page', () => {
    const { getByText } = render(<App />);
    // expect to get by text the following string
    expect(getByText('GETFLIX')).toBeTruthy();
  });
});

test('Check Getflix', () => {
  // this will render your initial html
  render(<App />);
  // this will log it
  // debug method is accesible from screen object
  screen.debug(screen.getByText('GETFLIX'));
});

test('check input', () => {
  // this will render your initial html
  render(<App />);
  // this will log it
  // debug method is accesible from screen object
  screen.debug(screen.getByPlaceholderText('Search the movie here'));
});

test('check screen entry', () => {
  // this will render your initial html
  render(<App />);
  // this will log it
  // debug method is accesible from screen object

  const search = screen.getByPlaceholderText('Search the movie here');
  const button = screen.getByTestId('button-element');
  screen.debug(search);
  screen.debug(button);
});

test('Test search bar select', () => {
  render(<App />);
  const search = screen.getByPlaceholderText('Search the movie here');
  userEvent.click(search);

  expect(search.value).toBe('');
});

test('Test Search bar typing', () => {
  render(<App />);
  const search = screen.getByPlaceholderText('Search the movie here');
  userEvent.type(search, 'Hello World!');
  expect(search.value).toBe('Hello World!');
});


/* 

will need further refinement:

it('Test Search bar typing and enter', async () => {
  const { getByTestId, getByText } = render(<App />);
  expect(getByTestId('button-element'));
  const search = getByTestId('input-element');
  const button = getByTestId('button-element');
  userEvent.type(search, 'mad');
  screen.debug(search);
  userEvent.click(button);

  // Using Async to wait for web page to load, added rendering id in second rendering
  const checkDetails = await waitFor(() => {
    getByTestId('rendering');
  });
  screen.debug();

  // Expecting to find this text
  expect(getByText('Mad Max: Fury Road')).toBeTruthy();
});
*/
