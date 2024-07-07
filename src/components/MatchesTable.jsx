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
                    TIMED: 'Запланирован(?)',
                  };
                  const status = statusNames[match.status];

                  const { fullTime, extraTime, penalties } = match.score;
                  const formatTime = (time) => (time?.home && time?.away ? `(${time.home}:${time.away})` : '');
                  const formattedFullTime = formatTime(fullTime);
                  const formattedExtraTime = formatTime(extraTime);
                  const formattedPenalties = formatTime(penalties);
                  const score = [formattedFullTime, formattedExtraTime, formattedPenalties].join('-');
                  return (
                    <tr key={match.id} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4">{formattedDate}</td>
                      <td className="whitespace-nowrap px-6 py-4">{formattedTime}</td>
                      <td className="whitespace-nowrap px-6 py-4">{status}</td>
                      <td className="whitespace-nowrap px-6 py-4">{match.homeTeam.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{match.awayTeam.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{score}</td>
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
