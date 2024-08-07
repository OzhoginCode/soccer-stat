import Pagination from '../Pagination';

import './MatchesTable.css';

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
  <tr className="match-row">
    {
      tableData.map((tdName) => <td key={tdName} className="match-cell">{match[tdName]}</td>)
    }
    <td className="match-cell">
      {match.fullTimeScore}
      <span className="match-extra-scores">
        {match.extraTimeScore} {match.penaltiesScore}
      </span>
    </td>
  </tr>
);

const SkeletonMatchTr = () => (
  <tr className="match-row h-12 animate-pulse">
    <td className="match-cell" />
  </tr>
);

const MatchesTable = ({
  currentPage, setCurrentPage, matches, showSkeleton,
}) => {
  const itemsPerPage = 10;
  const totalItems = matches.length;

  const currentData = matches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="matches-table-container">
      <div className="matches-table-wrapper">
        <div className="matches-table-inner-wrapper">
          <table className="matches-table">
            <tbody>
              {showSkeleton
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonMatchTr key={index} /> // eslint-disable-line react/no-array-index-key
                ))
                : currentData.map((match) => {
                  const matchData = formatMatchData(match);
                  return (
                    <MatchTr match={matchData} key={match.id} />
                  );
                })}
            </tbody>
          </table>
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
