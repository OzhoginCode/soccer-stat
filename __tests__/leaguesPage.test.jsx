import {
  expect, test, beforeAll, afterEach, afterAll,
} from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render, screen, fireEvent, within, waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import server from './src/server.js';

import Leagues from '../src/pages/Leagues/Leagues.jsx';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('search', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <Leagues />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  await waitFor(() => screen.getByRole('searchbox'));

  const inputElement = screen.getByRole('searchbox');
  fireEvent.change(inputElement, { target: { value: 'лига 15' } });
  await screen.findByText('лига 15');

  const team1Element = screen.queryByText('лига 1');
  expect(team1Element).toBeNull();
});

test('pagination', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <Leagues />
      </MemoryRouter>
    </QueryClientProvider>,
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
