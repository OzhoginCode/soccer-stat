import {
  expect, test, beforeAll, afterEach, afterAll,
} from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render, screen, fireEvent, within,
} from '@testing-library/react';

import server from './src/server.js';

import Teams from '../src/pages/Teams/Teams.jsx';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('search', async () => {
  render(
    <MemoryRouter>
      <Teams />
    </MemoryRouter>,
  );

  const inputElement = screen.getByRole('searchbox');
  fireEvent.change(inputElement, { target: { value: 'команда 15' } });
  await screen.findByText('команда 15');

  const team1Element = screen.queryByText('команда 1');
  expect(team1Element).toBeNull();
});

test('pagination', async () => {
  render(
    <MemoryRouter>
      <Teams />
    </MemoryRouter>,
  );

  await screen.findByText('команда 1');
  await screen.findByText('команда 10');
  const team11Element = screen.queryByText('команда 11');
  expect(team11Element).toBeNull();

  const paginationNav = screen.getByLabelText('Pagination');
  const secondPageButton = within(paginationNav).getByText('2');

  fireEvent.click(secondPageButton);

  await screen.findByText('команда 11');
  await screen.findByText('команда 20');
  const team1Element = screen.queryByText('команда 1');
  expect(team1Element).toBeNull();
});
