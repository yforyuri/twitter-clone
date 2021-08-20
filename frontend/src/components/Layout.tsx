import React, { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <div className="flex bg-red-200 min-h-screen">
      <div className="bg-purple-200 flex-auto">1</div>
      <div className="bg-purple-300 max-w-screen-sm flex-auto">{children}</div>
      <div className="bg-purple-500 flex-auto">3</div>
    </div>
  );
};

export default Layout;
