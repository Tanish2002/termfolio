import { Metadata } from "next";

import FontForm from "@/components/Settings/Font/FontForm.server";
import { getServerSideURL } from "@/utils/getURL";
import { mergeSocialMetadata } from "@/utils/mergeOpenGraph";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const title = "Font | Settings | bakaotaku.dev";
  const description =
    "Customize your font settings effortlessly on this page. Choose between bitmap or mono fonts and preview your selection in real-time for the perfect look and readability.";
  return {
    title,
    description,
    ...mergeSocialMetadata({
      title,
      description,
      image: `${getServerSideURL()}/og/FontSetings.png`,
      url: "/settings/font"
    })
  };
}
export default async function FontPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold text-tokyo-night-orange">Font Settings</h1>
      <FontForm />
    </div>
  );
}
