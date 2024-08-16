export default {
  teams: () => '/teams',
  team: (id) => `/teams/${id}`,
  teamMatches: (id) => `/teams/${id}/matches`,
  competitions: () => '/competitions',
  competitionMatches: (id) => `/competitions/${id}/matches`,
};
