import React from "react";

import NavigableItemClient from "./NavigableItemClient";

const NavigableItem: React.FC<{
  divIndex: number;
  itemIndex: number;
  href?: string;
  children: React.ReactNode;
  label?: string;
}> = ({ divIndex, itemIndex, href, children, label }) => (
  <NavigableItemClient divIndex={divIndex} label={label} itemIndex={itemIndex} href={href}>
    {children}
  </NavigableItemClient>
);

export default React.memo(NavigableItem);
