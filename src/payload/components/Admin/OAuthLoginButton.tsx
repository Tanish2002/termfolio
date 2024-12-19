import Link from "next/link";

import { Button } from "@payloadcms/ui";
import { FaGithub } from "react-icons/fa6";

// import '../../../app/(app)/globals.css';

const OAuthLoginButton: React.FC = () => (
	<Link href="/api/users/oauth/authorize" className="flex w-full items-center justify-center">
		<Button className="rounded bg-tokyo-night-purple px-4 py-2 text-tokyo-night-background transition hover:bg-tokyo-night-purple/80">
			<div className="flex space-x-2">
				<FaGithub size={17} />
				<p className="font-semibold">Login Using GitHub</p>
			</div>
		</Button>
	</Link>
);

export default OAuthLoginButton;
