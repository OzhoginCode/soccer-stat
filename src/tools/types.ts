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

export type TeamMatchesResp = {
  matches: [];
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
  matches: [];
  competition: {
    name: string
  }
}

export type DataParams = DateValueType;

export type TeamNameQueryKey = [string, string, string]

export type TeamMatchesQueryKey = [string, string, string, DateType, DateType]

export type CompetitionDataQueryKey = [string, string, DateType, DateType]
