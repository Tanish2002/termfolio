import { Metadata } from "next";

import ThemeForm from "@/components/Settings/ThemeForm";
import { getServerSideURL } from "@/utils/getURL";
import { mergeSocialMetadata } from "@/utils/mergeOpenGraph";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
	const title = "Theme | Settings | bakaotaku.dev";
	const description =
		"Personalize your experience with the theme settings page. Select from System, Dark, or Light themes and preview your chosen style instantly for a tailored appearance.";
	return {
		title,
		description,
		...mergeSocialMetadata({
			title,
			description,
			image: `${getServerSideURL()}/og/FontSetings.png`,
			url: "/settings/theme"
		})
	};
}

export default async function ThemeSettingsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-4xl font-bold text-tokyo-night-orange">Theme Settings</h1>
			<ThemeForm />
		</div>
	);
}
