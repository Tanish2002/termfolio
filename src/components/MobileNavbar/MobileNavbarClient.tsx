'use client';
import React, { useCallback, useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';

const MobileNavbarClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <>
      <div className="fixed bottom-10 right-10 z-10 md:hidden">
        <span
          onClick={handleClick}
          className="w-12 h-12 rounded-xl bg-tokyo-night-red text-tokyo-night-background flex items-center justify-center cursor-pointer"
        >
          <CiMenuBurger className="w-6 stroke-2" />
        </span>
      </div>

      <div
        className={`fixed inset-0 z-9 bg-tokyo-night-background transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {isOpen && children}
      </div>
    </>
  );
};

export default MobileNavbarClient;
