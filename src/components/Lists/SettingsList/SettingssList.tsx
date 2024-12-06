import React from "react";

import SettingsListItemClient from "./SettingsListItemClient";
import { SettingsListItemProps, SettingsListProps } from "./types";
import { getCurrentFont, getCurrentTheme } from "@/lib/userSettings/userSettings.server";

const SettingsList: React.FC<SettingsListProps> = async ({ divIndex, settingsKey }) => {
	const { theme } = await getCurrentTheme();
	const { font } = await getCurrentFont();
	const items: SettingsListItemProps[] = [
		{ name: "Font", settingsKey: "font", settingsValue: font },
		{ name: "Theme", settingsKey: "theme", settingsValue: theme }
	];
	return (
		<ul className="w-full space-y-2">
			{items.map((item, itemIndex) => (
				<SettingsListItemClient
					key={`setting-item-${itemIndex}`}
					divIndex={divIndex}
					settingsItem={item}
					itemIndex={itemIndex}
					pageKey={settingsKey}
				/>
			))}
		</ul>
	);
};

export default React.memo(SettingsList);
