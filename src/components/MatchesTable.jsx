import Pagination from './Pagination.jsx';

const MatchesTable = ({ currentPage, setCurrentPage, matches }) => {
  const itemsPerPage = 10;
  const totalItems = matches.length;

  const currentData = matches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <div className="flex flex-col bg-white mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <tbody>
                {currentData.map((match) => {
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
                  return (
                    <tr key={match.id} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4">{formattedDate}</td>
                      <td className="whitespace-nowrap px-6 py-4">{formattedTime}</td>
                      <td className="whitespace-nowrap px-6 py-4">{status}</td>
                      <td className="whitespace-nowrap px-6 py-4">{match.homeTeam.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{match.awayTeam.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{fullTimeScore} <span className="text-gray-400">{extraTimeScore} {penaltiesScore}</span></td>
                    </tr>
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
