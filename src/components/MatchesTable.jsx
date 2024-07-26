import Pagination from './Pagination.jsx';

const formatMatchData = (match) => {
  const date = new Date(match.utcDate);
  const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('ru-RU', optionsDate);

  const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedTime = date.toLocaleTimeString('ru-RU', optionsTime);

  const statusNames = {
    SCHEDULED: 'Запланирован',
    LIVE: 'В прямом эфире',
    IN_PLAY: 'В игре',
    PAUSED: 'Пауза',
    FINISHED: 'Завершен',
    POSTPONED: 'Отложен',
    SUSPENDED: 'Приостановлен',
    CANCELED: 'Отменен',
  };
  const status = statusNames[match.status];

  const homeTeam = match.homeTeam.name;
  const awayTeam = match.awayTeam.name;

  const { fullTime, extraTime, penalties } = match.score;

  const validateScore = (score) => {
    const isValid = score?.homeTeam !== null && score?.awayTeam !== null;
    return isValid;
  };

  const formatScore = (score) => `${score.homeTeam}:${score.awayTeam}`;
  const formatExtraScore = (score) => `(${formatScore(score)})`;

  const fullTimeScore = validateScore(fullTime) ? formatScore(fullTime) : null;
  const extraTimeScore = validateScore(extraTime)
    ? formatExtraScore(extraTime) : null;
  const penaltiesScore = validateScore(penalties)
    ? formatExtraScore(penalties) : null;

  return {
    date: formattedDate,
    time: formattedTime,
    status,
    homeTeam,
    awayTeam,
    fullTimeScore,
    extraTimeScore,
    penaltiesScore,
  };
};

const tableData = ['date', 'time', 'status', 'homeTeam', 'awayTeam'];

const MatchTr = ({ match }) => (
  <tr className="border-b dark:border-neutral-500">
    {
      tableData.map((tdName) => <td key={tdName} className="whitespace-nowrap px-6 py-4">{match[tdName]}</td>)
    }
    <td className="whitespace-nowrap px-6 py-4">{match.fullTimeScore} <span className="text-gray-400">{match.extraTimeScore} {match.penaltiesScore}</span></td>
  </tr>
);

const MatchesTable = ({ currentPage, setCurrentPage, matches }) => {
  const itemsPerPage = 10;
  const totalItems = matches.length;

  const currentData = matches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 mt-3 rounded-lg">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="min-w-full pt-2 pb-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <tbody>
                {currentData.map((match) => {
                  const matchData = formatMatchData(match);
                  return (
                    <MatchTr match={matchData} key={match.id} />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  );
};

export default MatchesTable;
