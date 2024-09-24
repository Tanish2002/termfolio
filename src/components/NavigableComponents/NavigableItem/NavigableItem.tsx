import React from 'react';
import NavigableItemClient from './NavigableItemClient';

const NavigableItem: React.FC<{ divIndex: number; itemIndex: number; href: string; children: React.ReactNode }> = ({ divIndex, itemIndex, href, children }) => (
  <NavigableItemClient divIndex={divIndex} itemIndex={itemIndex} href={href}>
    {children}
  </NavigableItemClient>
);

export default React.memo(NavigableItem);
