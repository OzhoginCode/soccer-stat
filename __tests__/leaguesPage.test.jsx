import {
  expect, test, beforeAll, afterEach, afterAll,
} from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render, screen, fireEvent, within,
} from '@testing-library/react';

import server from './src/server.js';

import Leagues from '../src/pages/Leagues.jsx';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('search', async () => {
  render(
    <MemoryRouter>
      <Leagues />
    </MemoryRouter>,
  );

  const inputElement = screen.getByRole('searchbox');
  fireEvent.change(inputElement, { target: { value: 'лига 15' } });
  await screen.findByText('лига 15');

  const team1Element = screen.queryByText('лига 1');
  expect(team1Element).toBeNull();
});

test('pagination', async () => {
  render(
    <MemoryRouter>
      <Leagues />
    </MemoryRouter>,
  );

  await screen.findByText('лига 1');
  await screen.findByText('лига 10');
  const team11Element = screen.queryByText('лига 11');
  expect(team11Element).toBeNull();

  const paginationNav = screen.getByLabelText('Pagination');
  const secondPageButton = within(paginationNav).getByText('2');

  fireEvent.click(secondPageButton);

  await screen.findByText('лига 11');
  await screen.findByText('лига 20');
  const team1Element = screen.queryByText('лига 1');
  expect(team1Element).toBeNull();
});
