import React from 'react';
import MobileNavbarClient from './MobileNavbarClient';
import MobileNavbarContent from './MobileNavbarContent';

const MobileNavbar: React.FC<{ list: React.ReactNode }> = ({ list }) => {
  return (
    <>
      <MobileNavbarClient>
        <MobileNavbarContent list={list} />
      </MobileNavbarClient>
    </>
  );
};

export default MobileNavbar;
