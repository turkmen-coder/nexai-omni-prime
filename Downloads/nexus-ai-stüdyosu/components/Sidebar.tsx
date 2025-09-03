
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeIcon, PencilSquareIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon } from './icons/Icons';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const navigation = [
    { name: t('sidebar.studio'), href: '/', icon: HomeIcon },
    { name: t('sidebar.promptBuilder'), href: '/prompt-builder', icon: PencilSquareIcon },
    { name: t('sidebar.chat'), href: '/chat', icon: ChatBubbleLeftRightIcon },
    { name: t('sidebar.settings'), href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="z-20 flex flex-col w-16 sm:w-20 lg:w-64 bg-nexus-dark/50 backdrop-blur-sm border-r border-white/10 p-2 lg:p-4">
      <div className="flex items-center gap-2 h-16 flex-shrink-0 px-2 lg:px-4">
        <svg className="w-8 h-8 text-nexus-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
        </svg>
        <h1 className="text-xl font-bold hidden lg:block text-white">{t('app.name')}</h1>
      </div>
      <nav className="mt-8 flex-1">
        <ul role="list" className="flex flex-col items-center lg:items-stretch space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold items-center justify-center lg:justify-start transition-all duration-200 ease-in-out
                  ${isActive
                    ? 'bg-nexus-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-nexus-primary/50 lg:hover:translate-x-1'
                  }`
                }
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden={true} />
                <span className="hidden lg:block">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
