import { useQuery, useQueries } from '@tanstack/react-query';

import client from './apiClient.ts';
import paths from './paths.ts';

import {
  TeamsResp, TeamNameResp, TeamMatchesResp,
  CompetitionsResp, CompetitionDataResp, DataParams,
  CompetitionDataQueryKey, TeamNameQueryKey, TeamMatchesQueryKey,
} from './types.ts';

const getTeams = async () => {
  const { data } = await client.get<TeamsResp>(paths.teams());
  return data.teams;
};

const getTeamName = async ({ queryKey }: { queryKey: TeamNameQueryKey }) => {
  const [, , id] = queryKey;
  const { data } = await client.get<TeamNameResp>(paths.team(id));
  return data.name;
};

const getTeamMatches = async ({ queryKey }: { queryKey: TeamMatchesQueryKey}) => {
  const [, , id, dateFrom, dateTo] = queryKey;
  const params = { dateFrom, dateTo };
  const { data } = await client.get<TeamMatchesResp>(paths.teamMatches(id), { params });
  return data.matches;
};

const getCompetitions = async () => {
  const { data } = await client.get<CompetitionsResp>(paths.competitions());
  return data.competitions;
};

const getCompetitionData = async ({ queryKey }: { queryKey: CompetitionDataQueryKey }) => {
  const [, id, dateFrom, dateTo] = queryKey;
  const params = { dateFrom, dateTo };
  const { data } = await client.get<CompetitionDataResp>(paths.competitionMatches(id), { params });
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

export const useGetTeamData = (id: string, dataParams: DataParams) => {
  const { startDate = null, endDate = null } = dataParams || {};

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

export const useGetCompetitionData = (id: string, dataParams: DataParams) => {
  const { startDate = null, endDate = null } = dataParams || {};

  const queryKey: CompetitionDataQueryKey = ['competitionData', id, startDate, endDate];

  const queryResult = useQuery({
    queryKey,
    queryFn: getCompetitionData,
    initialData: { matches: [], competition: { name: '' } },
  });

  return { ...queryResult, queryKey };
};
