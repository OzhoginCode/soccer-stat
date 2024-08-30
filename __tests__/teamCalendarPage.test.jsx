import {
  expect, test, beforeAll, afterEach, afterAll,
} from 'vitest';
import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import {
  render, screen, fireEvent, within, waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import server from './src/server.js';

import TeamCalendar from '../src/pages/TeamCalendar/index.ts';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('teams table render', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={['/team/1']}>
        <Routes>
          <Route path="/team/:id" element={<TeamCalendar />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  const team1 = await screen.findByText('Home Team 1');
  const team1El = team1.closest('tr');
  await within(team1El).findByText('01.01.2024');
  await within(team1El).findByText(/запланирован/i);
  await within(team1El).findByText('Away Team 1');
  await within(team1El).findByText('1:2');

  const team2 = await screen.findByText('Home Team 2');
  const team2El = team2.closest('tr');
  await within(team2El).findByText('01.01.2025');
  await within(team2El).findByText(/запланирован/i);
  await within(team2El).findByText('Away Team 2');
  await within(team2El).findByText('2:1');
  await within(team2El).findByText('(1:1) (2:2)');
});

test('date filtering', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={['/team/1']}>
        <Routes>
          <Route path="/team/:id" element={<TeamCalendar />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  const dateInput = await screen.findByRole('presentation');
  fireEvent.change(dateInput, { target: { value: '01/01/2025 - 02/01/2025' } });

  await waitFor(() => screen.findByRole('presentation'));

  const team1 = screen.queryByText('Home Team 1');
  expect(team1).toBeNull();

  const team2 = screen.queryByText('Home Team 2');
  const team2El = team2.closest('tr');
  await within(team2El).findByText('01.01.2025');
});

test('pagination', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={['/team/1']}>
        <Routes>
          <Route path="/team/:id" element={<TeamCalendar />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  await screen.findByText('Home Team 1');
  await screen.findByText('Home Team 10');
  const team11 = screen.queryByText('Home Team 11');
  expect(team11).toBeNull();

  const paginationNav = screen.getByLabelText('Pagination');
  const secondPageButton = within(paginationNav).getByText('2');

  fireEvent.click(secondPageButton);

  await screen.findByText('Home Team 11');
  await screen.findByText('Home Team 20');
  const team1 = screen.queryByText('Home Team 1');
  expect(team1).toBeNull();
});
