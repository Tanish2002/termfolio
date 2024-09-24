'use client';
import React from 'react';
import { useNavigableFocus } from '../NavigableComponents/NavigableFocusContext';

interface BorderBoxClientProps {
  children: React.ReactNode;
}

const BorderBoxClient: React.FC<BorderBoxClientProps> = (props) => {
  const isFocused = useNavigableFocus();

  return (
    <div className={`relative border-2 ${isFocused ? "border-tokyo-night-red" : "border-tokyo-night-selection"} p-2 w-full h-full box-border`}>
      {props.children}
    </div>
  );
};

export default React.memo(BorderBoxClient);
