import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const teams = Array.from({ length: 20 }, (_, i) => ({
  name: `команда ${i + 1}`,
  id: i + 1,
  crest: `/some-img-${i + 1}`,
}));

const competitions = Array.from({ length: 20 }, (_, i) => ({
  name: `лига ${i + 1}`,
  id: i + 1,
  area: {
    name: `страна ${i + 1}`,
  },
}));

const matches = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  utcDate: i === 1 ? '2025-01-01T12:00:00.850Z' : '2024-01-01T12:00:00.850Z',
  status: 'SCHEDULED',
  homeTeam: { name: `Home Team ${i + 1}` },
  awayTeam: { name: `Away Team ${i + 1}` },
  score: {
    fullTime: { home: i % 2 === 0 ? 1 : 2, away: i % 2 === 0 ? 2 : 1 },
  },
}));

const server = setupServer(
  http.get('/api/teams', () => HttpResponse.json({ teams })),
  http.get('/api/teams/:id', ({ params }) => HttpResponse.json({ name: `команда ${params.id}` })),
  http.get('/api/teams/:id/matches', ({ request }) => {
    const url = new URL(request.url);
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');
    let filteredMatches = matches;

    if (dateFrom && dateTo) {
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      filteredMatches = matches.filter((match) => {
        const matchDate = new Date(match.utcDate);
        return matchDate >= fromDate && matchDate <= toDate;
      });
    }
    return HttpResponse.json({ matches: filteredMatches });
  }),
  http.get('/api/competitions', () => HttpResponse.json({ competitions })),
  http.get('/api/competitions/:id/matches', ({ params, request }) => {
    const url = new URL(request.url);
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');
    let filteredMatches = matches;

    if (dateFrom && dateTo) {
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      filteredMatches = matches.filter((match) => {
        const matchDate = new Date(match.utcDate);
        return matchDate >= fromDate && matchDate <= toDate;
      });
    }
    return HttpResponse.json({ competition: { name: `Лига ${params.id}` }, matches: filteredMatches });
  }),
);

export default server;
