import { permanentRedirect } from "next/navigation";

export const dynamic = "force-static";

export default async function SettingsRedirect() {
	permanentRedirect("/settings/font");
}
