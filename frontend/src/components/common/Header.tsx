import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const [hamburgerToggle, setHamburgerToggle] = useState<boolean>(false);

  const onClickHamburgerToggle = () => {
    setHamburgerToggle(true);
  };

  const onClickLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <h1 className="font-bold text-xl p-4 border-b-1 flex justify-between">
        <h1 className="hidden md:block">{title}</h1>
        <button className="md:hidden" onClick={onClickHamburgerToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div>
          <button
            className="border-1 border-gray-200 text-gray-200 text-xs py-1 px-2 rounded-full hover:border-purple-500 hover:text-purple-500"
            onClick={onClickLogout}
          >
            Log out
          </button>
        </div>
      </h1>
      {hamburgerToggle && (
        <HamburgerMenu title={title} setHamburgerToggle={setHamburgerToggle} />
      )}
    </>
  );
};

export default Header;
