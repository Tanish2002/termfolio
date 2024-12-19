const redirects = async () => {
	const internetExplorerRedirect = {
		destination: "/ie-incompatible.html",
		has: [
			{
				type: "header",
				key: "user-agent",
				value: "(.*Trident.*)" // all ie browsers
			}
		],
		permanent: false,
		source: "/:path((?!ie-incompatible.html$).*)" // all pages except the incompatibility page
	};

	const settingsRedirect = {
		source: "/settings",
		destination: "/settings/font",
		permanent: true
	};

	const redirects = [internetExplorerRedirect, settingsRedirect];

	return redirects;
};

export default redirects;
