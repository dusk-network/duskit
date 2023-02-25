export default {
	// TODO Entries should be fed directly from the CMS
	entries: ["/"],
	cookieConfig: {
		expires: 365,
		path: "/",
		secure: true,
		sameSite: "none",
	},
	cookieFields: {
		essential: true,
		tracking: false,
		analytics: false,
		marketing: false,
	},
	themeCookieName: "DUSK-THEME",
	gdprCookieName: "DUSK-GDPR",
};
