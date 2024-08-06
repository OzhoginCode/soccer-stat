import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon } from '@heroicons/react/24/solid';

import './ThemeToggle.css';

const ThemeToggle = () => {
  const initialTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(initialTheme);
  const [enabled, setEnabled] = useState(theme === 'light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'theme') {
        setTheme(event.newValue);
        setEnabled(event.newValue === 'light');
      }
    });
  }, []);

  const handleThemeChange = (isEnabled) => {
    const newTheme = isEnabled ? 'light' : 'dark';
    setTheme(newTheme);
    setEnabled(isEnabled);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleThemeChange}
      className={`theme-switch ${enabled ? 'enabled' : 'disabled'}`}
    >
      <span className="sr-only">Переключение темы сайта</span>
      <span className={`theme-switch-thumb ${enabled ? 'thumb-enabled' : 'thumb-disabled'}`}>
        <span
          className={`theme-icon ${enabled ? 'icon-disabled' : 'icon-enabled'}`}
          aria-hidden="true"
        >
          <SunIcon className="icon" />
        </span>

        <span
          className={`theme-icon ${enabled ? 'icon-enabled' : 'icon-disabled'}`}
          aria-hidden="true"
        >
          <SunIcon className="icon enabled" />
        </span>
      </span>
    </Switch>
  );
};

export default ThemeToggle;
