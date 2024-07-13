import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Disclosure, DisclosureButton, DisclosurePanel,
} from '@headlessui/react';

import ThemeToggle from './ThemeToggle.jsx';
import classNames from '../tools/classNames.js';
import logo from '../assets/logo.svg';

const Navigation = () => {
  const { pathname } = useLocation();
  const navigation = [
    { name: 'Лиги', href: '/leagues' },
    { name: 'Команды', href: '/teams' },
  ];
  return (
    <Disclosure as="nav" className="bg-indigo-600 dark:bg-slate-800 fixed w-full z-50 -mt-16">
      {({ close }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt="Главная страница"
                    src={logo}
                    className="h-8 w-8 bg-white rounded-full"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={classNames(
                          pathname === item.href ? 'bg-white text-black dark:bg-indigo-600 dark:text-white' : 'text-white bg-indigo-600 hover:bg-gray-300 hover:text-gray-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <ThemeToggle />
                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-indigo-600 dark:bg-indigo-600 p-2 text-gray-400 dark:text-white hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                    <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>
          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={classNames(
                    pathname === item.href ? 'bg-white text-black dark:bg-indigo-600 dark:text-white' : 'text-white bg-indigo-600 hover:bg-gray-300 hover:text-gray-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  onClick={() => close()}
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
