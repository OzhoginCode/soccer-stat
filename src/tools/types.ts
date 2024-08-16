import { DateType, DateValueType } from 'react-tailwindcss-datepicker';

export type Team = {
  id: string;
  name: string;
  crestUrl: string;
}

export type TeamsResp = {
  teams: Team[];
}

export type TeamNameResp = {
  name: string;
}

export enum statusNames {
  SCHEDULED = 'Запланирован',
  LIVE = 'В прямом эфире',
  IN_PLAY = 'В игре',
  PAUSED = 'Пауза',
  FINISHED = 'Завершен',
  POSTPONED = 'Отложен',
  SUSPENDED = 'Приостановлен',
  CANCELED = 'Отменен',
}

export type Score = {
  homeTeam: number | null;
  awayTeam: number | null;
};

export type Match = {
  id: number
  utcDate: string
  status: keyof typeof statusNames
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: {
    fullTime: Score;
    extraTime: Score;
    penalties: Score;
  };
}

export type TeamMatchesResp = {
  matches: Match[];
}

export type Competition = {
  name: string
  id: number
  area: {
    name: string
  }
}

export type CompetitionsResp = {
  competitions: Competition[]
}

export type CompetitionDataResp = {
  matches: Match[];
  competition: {
    name: string
  }
}

export type DataParams = DateValueType;

export type TeamNameQueryKey = [string, string, string]

export type TeamMatchesQueryKey = [string, string, string, DateType, DateType]

export type CompetitionDataQueryKey = [string, string, DateType, DateType]
