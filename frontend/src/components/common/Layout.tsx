import React, { FC, useContext } from 'react';
import { MeContext } from '../../contexts';
import Login from '../login/Login';

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
      <div className="flex-auto">1</div>
      <div className="max-w-screen-sm flex-auto border-r-1 border-l-1">
        {children}
      </div>
      <div className="flex-auto">3</div>
    </div>
  );
};

export default Layout;
