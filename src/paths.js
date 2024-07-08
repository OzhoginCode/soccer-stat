export default {
  teams: () => '/teams',
  team: (id) => `/teams/${id}`,
  teamMatches: (id) => `/teams/${id}/matches`,
  competitions: () => '/competitions',
  competition: (id) => `/competitions/${id}`,
  competitionMatches: (id) => `/competitions/${id}/matches`,
};
