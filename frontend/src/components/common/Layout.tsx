import React, { FC, useContext } from 'react';
import { MeContext } from '../../contexts';
import Login from '../login/Login';
import RightMenu from '../right/RightMenu';
import LeftMenu from './LeftMenu';

const Layout: FC = ({ children }) => {
  const { me } = useContext(MeContext);

  if (!me)
    return (
      <div>
        <Login />
      </div>
    );
  return (
    <div className="flex min-h-screen font-noto">
      <div className="hidden md:block">
        <LeftMenu />
      </div>
      <div className="max-w-screen-sm flex-auto border-r-1 border-l-1">
        {children}
      </div>
      <div className="hidden md:block">
        <RightMenu />
      </div>
    </div>
  );
};

export default Layout;
