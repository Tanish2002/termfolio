import React from 'react';
import { RoutesListItemProps, RoutesListProps } from './types';
import RoutesListItemClient from './RoutesListItemClient';

const items: RoutesListItemProps[] = [
  { name: 'About', path: "/" },
  { name: 'Experience', path: "/experience" },
  { name: 'Projects', path: "/project" },
  { name: 'Blog', path: "/blog" },
]

const RoutesList: React.FC<RoutesListProps> = ({ divIndex }) => {
  return (
    <ul className="space-y-2 w-full">
      {items.map((item, itemIndex) => {
        return (
          <RoutesListItemClient
            key={`routes-item-${itemIndex}`}
            divIndex={divIndex}
            routesItem={item}
            itemIndex={itemIndex}
          />
        )
      })}
    </ul>
  );
};

export default React.memo(RoutesList);
