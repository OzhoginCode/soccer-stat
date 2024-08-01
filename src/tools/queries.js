import { useQuery, useQueries } from '@tanstack/react-query';

import client from './apiClient';
import paths from './paths.js';

const getTeams = async () => {
  const { data } = await client.get(paths.teams());
  return data.teams;
};

const getTeamName = async ({ queryKey }) => {
  const [, , id] = queryKey;
  const { data } = await client.get(paths.team(id));
  return data.name;
};

const getTeamMatches = async ({ queryKey }) => {
  const [, , id, dateFrom, dateTo] = queryKey;
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

export const useGetTeams = () => {
  const queryKey = ['teams'];

  const queryResult = useQuery({
    queryKey,
    queryFn: getTeams,
    initialData: [],
  });

  return { ...queryResult, queryKey };
};

export const useGetTeamData = (id, { startDate, endDate }) => {
  const teamDataKey = 'teamData';
  const queries = useQueries({
    queries: [
      {
        queryKey: [teamDataKey, 'teamName', id],
        queryFn: getTeamName,
        initialData: '',
      },
      {
        queryKey: [teamDataKey, 'teamMatches', id, startDate, endDate],
        queryFn: getTeamMatches,
        initialData: [],
      },
    ],
  });

  const fetchStatus = queries.some((query) => query.isFetching) ? 'fetching' : 'idle';
  const error = queries.find((query) => query.error)?.error || null;

  const [teamNameQuery, teamMatchesQuery] = queries;
  const data = { teamName: teamNameQuery.data, matches: teamMatchesQuery.data };

  return {
    fetchStatus, error, data, queryKey: [teamDataKey],
  };
};

export const useGetCompetitions = () => {
  const queryKey = ['competitions'];

  const queryResult = useQuery({
    queryKey,
    queryFn: getCompetitions,
    initialData: [],
  });

  return { ...queryResult, queryKey };
};

export const useGetCompetitionData = (id, { startDate, endDate }) => {
  const queryKey = ['competitionData', id, startDate, endDate];

  const queryResult = useQuery({
    queryKey,
    queryFn: getCompetitionData,
    initialData: { matches: [], competition: { name: '' } },
  });

  return { ...queryResult, queryKey };
};
