import React, { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <div className="flex bg-red-200 min-h-screen font-noto">
      <div className="flex-auto">1</div>
      <div className="max-w-screen-sm flex-auto">{children}</div>
      <div className="flex-auto">3</div>
    </div>
  );
};

export default Layout;
