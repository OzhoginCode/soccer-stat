import { useRouteError } from 'react-router-dom';

import Navigation from '../../components/Navigation';
import ErrorModal from '../../components/ErrorModal';

const ErrorPage = () => {
  const error = useRouteError();

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
