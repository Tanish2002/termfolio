import ThemeForm from "@/components/Settings/ThemeForm";

export const dynamic = "force-static";

export default async function ThemeSettingsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-4xl font-bold text-tokyo-night-orange">Theme Settings</h1>
			<ThemeForm />
		</div>
	);
}
