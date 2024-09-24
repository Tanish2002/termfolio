// BorderBoxServer.tsx (Server Component)
import React from 'react';

export interface TextProps {
  textYPosition: 'top' | 'bottom';
  textXPosition: 'left' | 'center' | 'right';
  text: string;
}

interface BorderBoxContainerProps {
  texts: TextProps[];
  children: React.ReactNode;
}

const BorderBoxContainer: React.FC<BorderBoxContainerProps> = async ({ texts, children }) => {
  const getYPositionClass = (textYPosition: TextProps['textYPosition']): string => {
    return textYPosition === 'bottom' ? '-bottom-3' : '-top-3';
  };

  const getXPositionClass = (textXPosition: TextProps['textXPosition']): string => {
    switch (textXPosition) {
      case 'left':
        return 'left-2 transform translate-x-2';
      case 'right':
        return 'right-0 transform translate-x-0';
      case 'center':
      default:
        return 'left-1/2 transform -translate-x-1/2';
    }
  };

  return (
    <>
      {texts.map(({ textYPosition, textXPosition, text }, index) => (
        <span
          key={index}
          className={`absolute ${getYPositionClass(textYPosition)} ${getXPositionClass(textXPosition)} bg-tokyo-night-background px-2 text-tokyo-night-red`}
        >
          {text}
        </span>
      ))}
      <div className="relative h-full overflow-y-auto">
        <div className="flex flex-col min-h-full py-2 text-lg">
          {children}
        </div>
      </div>
    </>
  );
};

export default React.memo(BorderBoxContainer);
