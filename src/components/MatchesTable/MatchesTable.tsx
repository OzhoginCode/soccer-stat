import { FC } from 'react';
import Pagination from '../Pagination/index.ts';

import './MatchesTable.css';

import { Match, statusNames, Score } from '../../services/types.ts';

type FormattedMatchData = {
  date: string
  time: string
  status: string
  homeTeam: string
  awayTeam: string
  fullTimeScore: string | null
}

const formatMatchData = (match: Match): FormattedMatchData => {
  const date = new Date(match.utcDate);
  const optionsDate: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('ru-RU', optionsDate);

  const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedTime = date.toLocaleTimeString('ru-RU', optionsTime);

  const status = statusNames[match.status];

  const homeTeam = match.homeTeam.name;
  const awayTeam = match.awayTeam.name;

  const { fullTime } = match.score;

  const validateScore = (score: Score) => {
    const isValid = score.home !== null && score.away !== null;
    return isValid;
  };

  const formatScore = (score: Score) => `${String(score.home)}:${String(score.away)}`;

  const fullTimeScore = validateScore(fullTime) ? formatScore(fullTime) : null;

  return {
    date: formattedDate,
    time: formattedTime,
    status,
    homeTeam,
    awayTeam,
    fullTimeScore,
  };
};

const tableData: (keyof FormattedMatchData)[] = ['date', 'time', 'status', 'homeTeam', 'awayTeam'];

interface MatchTrProps {
  match: FormattedMatchData
}

const MatchTr: FC<MatchTrProps> = ({ match }) => (
  <tr className="match-row">
    {
      tableData.map((tdName) => <td key={tdName} className="match-cell">{match[tdName]}</td>)
    }
    <td className="match-cell">
      {match.fullTimeScore}
    </td>
  </tr>
);

const SkeletonMatchTr = () => (
  <tr className="match-row h-12 animate-pulse">
    <td className="match-cell" />
  </tr>
);

interface MatchesTableProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  matches: Match[]
  showSkeleton: boolean
}

const MatchesTable: FC<MatchesTableProps> = ({
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
