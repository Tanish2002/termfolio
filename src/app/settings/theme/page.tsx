import ThemeForm from "@/components/Settings/ThemeForm";
import { getCurrentTheme } from "@/lib/userSettings";

export default async function ThemeSettingsPage() {
	// Fetch current user settings server-side
	const currentSettings = await getCurrentTheme();

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-4xl font-bold text-tokyo-night-orange">Theme Settings</h1>
			<ThemeForm initialTheme={currentSettings.theme} />
		</div>
	);
}
