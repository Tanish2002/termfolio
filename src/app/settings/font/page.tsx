import FontForm from "@/components/Settings/Font/FontForm";
import { getCurrentFont } from "@/lib/userSettings/server";

export default async function FontPage() {
	// Fetch current user settings server-side
	const currentSettings = await getCurrentFont();

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-4xl font-bold text-tokyo-night-orange">Font Settings</h1>
			<FontForm initialFont={currentSettings.font} />
		</div>
	);
}
