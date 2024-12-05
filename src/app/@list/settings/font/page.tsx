import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";
import SettingsList from "@/components/Lists/SettingsList/SettingssList";

async function Settings() {
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: "settings" }]}>
			<SettingsList divIndex={2} settingsKey="font" />
		</BorderBox>
	);
}
export default React.memo(Settings);
