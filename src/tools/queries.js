import { useQuery, useQueries } from '@tanstack/react-query';

import client from './apiClient';
import paths from './paths.js';

const getTeams = async () => {
  const { data } = await client.get(paths.teams());
  return data.teams;
};

const getTeamName = async ({ queryKey }) => {
  const [, id] = queryKey;
  const { data } = await client.get(paths.team(id));
  return data.name;
};

const getTeamMatches = async ({ queryKey }) => {
  const [, id, dateFrom, dateTo] = queryKey;
  const { data } = await client.get(paths.teamMatches(id), { params: { dateFrom, dateTo } });
  return data.matches;
};

const getCompetitions = async () => {
  const { data } = await client.get(paths.competitions());
  return data.competitions;
};

const getCompetitionData = async ({ queryKey }) => {
  const [, id, dateFrom, dateTo] = queryKey;
  const { data } = await client.get(paths.competitionMatches(id), { params: { dateFrom, dateTo } });
  return data;
};

export const useGetTeams = () => useQuery({
  queryKey: ['teams'],
  queryFn: getTeams,
  initialData: [],
});

export const useGetTeamData = (id, { startDate, endDate }) => useQueries({
  queries: [
    {
      queryKey: ['teamName', id],
      queryFn: getTeamName,
      initialData: '',
    },
    {
      queryKey: ['teamMatches', id, startDate, endDate],
      queryFn: getTeamMatches,
      initialData: [],
    },
  ],
});

export const useGetCompetitions = () => useQuery({
  queryKey: ['competitions'],
  queryFn: getCompetitions,
  initialData: [],
});

export const useGetCompetitionData = (id, { startDate, endDate }) => useQuery({
  queryKey: ['competitionData', id, startDate, endDate],
  queryFn: getCompetitionData,
  initialData: { matches: [], competition: { name: '' } },
});
