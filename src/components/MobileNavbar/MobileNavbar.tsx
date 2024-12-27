import React from "react";

import cn from "@/utils/cn";

import RoutesList from "../Lists/RoutesList/RoutesList";
import SocialList from "../Lists/SocialList/SocialList";
import NavigableDiv from "../NavigableComponents/NavigableDiv/NavigableDiv";
import MobileNavbarClient from "./MobileNavbarClient";

const MobileNavbar: React.FC<{ list: React.ReactNode }> = async ({ list }) => {
  return (
    <>
      <MobileNavbarClient>
        <div
          className={cn(
            "grid h-svh grid-cols-1 grid-rows-6 gap-4 overflow-y-scroll bg-tokyo-night-background p-5 text-tokyo-night-foreground",
          )}
        >
          <NavigableDiv index={10} className="row-span-2">
            <RoutesList divIndex={1} />
          </NavigableDiv>
          <NavigableDiv index={11} className="row-span-2">
            {/* Render a parallel route based on the current pathName */}
            {list}
          </NavigableDiv>
          <NavigableDiv index={12} className="row-span-2">
            <SocialList divIndex={3} />
          </NavigableDiv>
        </div>
      </MobileNavbarClient>
    </>
  );
};

export default MobileNavbar;
