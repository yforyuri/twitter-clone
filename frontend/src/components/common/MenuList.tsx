import {
  faHome,
  faBell,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';
import MenuButton from './MenuButton';

const menuConfig = [
  { id: 1, title: 'Home', icon: faHome, link: '/' },
  { id: 2, title: 'Notification', icon: faBell, link: '/notification' },
  { id: 3, title: 'Message', icon: faEnvelope, link: '/message' },
  { id: 4, title: 'Profile', icon: faUser, link: '/profile' },
];

const MenuList: FC = () => {
  return (
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
  );
};

export default MenuList;
