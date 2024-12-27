import React from "react";

import { BaseList } from "@/components/Lists/BaseList";
import { BaseListItem } from "@/components/Lists/types";
import { getCurrentFont, getCurrentTheme } from "@/lib/userSettings/server";

export const dynamic = "force-static";

export default React.memo(async function Settings() {
  const { theme } = await getCurrentTheme();
  const { font } = await getCurrentFont();
  const items: BaseListItem[] = [
    {
      leftContent: "Font",
      rightContent: font,
      href: "/settings/font"
    },
    {
      leftContent: "Theme",
      rightContent: theme ?? "system",
      href: "/settings/theme"
    }
  ];
  return <BaseList divIndex={2} items={items} boxText="settings" />;
});
