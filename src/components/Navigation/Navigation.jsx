import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Disclosure, DisclosureButton, DisclosurePanel,
} from '@headlessui/react';

import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';
import classNames from '../../tools/classNames.js';
import logo from '../../assets/logo.svg';

import './Navigation.css';

const Navigation = () => {
  const { pathname } = useLocation();
  const navigation = [
    { name: 'Лиги', href: '/leagues' },
    { name: 'Команды', href: '/teams' },
  ];
  return (
    <Disclosure as="nav" className="nav-container">
      {({ close }) => (
        <>
          <div className="nav-content">
            <div className="nav-inner-content">
              <div className="nav-logo">
                <img
                  alt="Главная страница"
                  src={logo}
                  className="nav-logo-img"
                />
                <div className="nav-links">
                  <div className="nav-links-inner">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={classNames(
                          pathname === item.href ? 'nav-link-active' : 'nav-link-inactive',
                          'nav-link-base',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="nav-icons">
                <ThemeToggle />
                <div className="nav-mobile-menu">
                  <DisclosureButton className="nav-mobile-menu-button group">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="nav-mobile-menu-icon group-data-[open]:hidden" />
                    <XMarkIcon aria-hidden="true" className="nav-mobile-menu-icon hidden group-data-[open]:block" />
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>
          <DisclosurePanel className="nav-mobile-panel">
            <div className="nav-mobile-panel-links">
              {navigation.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={classNames(
                    pathname === item.href ? 'nav-link-active' : 'nav-link-inactive',
                    'nav-link-base',
                  )}
                  onClick={close}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;
