import React from "react";

import NavigableDivClient from "./NavigableDivClient";

const NavigableDiv: React.FC<
  React.PropsWithChildren<{
    index: number;
    className: string;
    label?: string;
    isScrollable?: boolean;
  }>
> = ({ index, children, className, label, isScrollable = false }) => (
  <NavigableDivClient index={index} className={className} label={label} isScrollable={isScrollable}>
    {children}
  </NavigableDivClient>
);

export default React.memo(NavigableDiv);
