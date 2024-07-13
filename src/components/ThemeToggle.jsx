import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon } from '@heroicons/react/24/solid';

import classNames from '../tools/classNames.js';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const [enabled, setEnabled] = useState(theme === 'light');

  const handleThemeChange = (isEnabled) => {
    setTheme(isEnabled ? 'light' : 'dark');
    setEnabled(isEnabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleThemeChange}
      className={classNames(
        enabled ? 'bg-yellow-600' : 'bg-gray-400',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out mr-4 md:mr-0',
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-0 duration-100 ease-out'
              : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-gray-400" />
        </span>
        <span
          className={classNames(
            enabled
              ? 'opacity-100 duration-200 ease-in'
              : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-yellow-600" />
        </span>
      </span>
    </Switch>
  );
};

export default ThemeToggle;
