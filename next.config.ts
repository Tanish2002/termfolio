import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: false
	},
	async redirects() {
		return [
			// Basic redirect
			{
				source: "/settings",
				destination: "/settings/font",
				permanent: true
			}
		];
	}
};

export default nextConfig;
