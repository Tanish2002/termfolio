import { permanentRedirect } from "next/navigation";

export default async function SettingsRedirect() {
	permanentRedirect("/settings/font");
}
