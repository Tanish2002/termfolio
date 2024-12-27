import React from "react";

import { BaseListSkeleton } from "@/components/Lists/BaseListSkeleton";

async function SettingsLoading() {
  return <BaseListSkeleton boxText="settings" />;
}

export default React.memo(SettingsLoading);
