import { useRouteError } from 'react-router-dom';

import Navigation from '../../components/Navigation/index.ts';
import ErrorModal from '../../components/ErrorModal/index.ts';

const ErrorPage = () => {
  const error = useRouteError() as { status: number };

  return (
    <div className="min-h-full">
      <Navigation />
      <main>
        <div className="main-container">
          <ErrorModal
            isOpen
            setIsOpen={() => {}}
            initialReloadTime={0}
            reload={() => {}}
            errorType={error.status}
          />
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
