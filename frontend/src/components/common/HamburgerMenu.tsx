import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, FC, SetStateAction } from 'react';

interface HamburgerMenuProps {
  title: string;
  setHamburgerToggle: Dispatch<SetStateAction<boolean>>;
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({
  title,
  setHamburgerToggle,
}) => {
  const onClickHamburgerToggle = () => {
    setHamburgerToggle(false);
  };
  return (
    <div className="fixed top-0 w-full min-h-screen bg-black bg-opacity-50 z-10">
      <div className="w-5/6 bg-white min-h-screen px-4">
        <div className="flex justify-between pt-4">
          <div className="font-black">{title}</div>
          <button onClick={onClickHamburgerToggle}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
