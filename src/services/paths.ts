export default {
  teams: () => '/teams',
  team: (id: string) => `/teams/${id}`,
  teamMatches: (id: string) => `/teams/${id}/matches`,
  competitions: () => '/competitions',
  competitionMatches: (id: string) => `/competitions/${id}/matches`,
};
