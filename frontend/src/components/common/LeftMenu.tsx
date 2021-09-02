import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import React, { FC } from 'react';
import MenuButton from './MenuButton';

const menuConfig = [
  { id: 1, title: 'Home', icon: faHome, link: '/' },
  { id: 2, title: 'Notification', icon: faBell, link: '/notification' },
  { id: 3, title: 'Message', icon: faEnvelope, link: '/message' },
  { id: 4, title: 'Profile', icon: faUser, link: '/profile' },
];

const LeftMenu: FC = () => {
  return (
    <div className="flex-auto flex justify-end mr-8">
      <div>
        <div>
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-3xl text-purple-400"
          />
        </div>
        <nav>
          {menuConfig.map((menu) => {
            return (
              <MenuButton
                key={menu.id}
                title={menu.title}
                icon={menu.icon}
                link={menu.link}
              />
            );
          })}
        </nav>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-black text-lg px-24 py-4 rounded-full mt-8"></button>
      </div>
    </div>
  );
};

export default LeftMenu;
