module.exports = () => ({
	light: {
		css: [
			{
				color: "var(--colors-gray-400)",
				'[class~="lead"]': {
					color: "var(--colors-gray-300)",
				},
				a: {
					color: "var(--colors-white)",
				},
				strong: {
					color: "var(--colors-white)",
				},
				"ol > li::before": {
					color: "var(--colors-gray-400)",
				},
				"ul > li::before": {
					backgroundColor: "var(--colors-gray-600)",
				},
				hr: {
					borderColor: "var(--colors-gray-200)",
				},
				blockquote: {
					color: "var(--colors-gray-200)",
					borderLeftColor: "var(--colors-gray-600)",
				},
				h1: {
					color: "var(--colors-white)",
				},
				h2: {
					color: "var(--colors-white)",
				},
				h3: {
					color: "var(--colors-white)",
				},
				h4: {
					color: "var(--colors-white)",
				},
				"figure figcaption": {
					color: "var(--colors-gray-400)",
				},
				code: {
					color: "var(--colors-white)",
				},
				"a code": {
					color: "var(--colors-white)",
				},
				pre: {
					color: "var(--colors-gray-200)",
					backgroundColor: "var(--colors-gray-800)",
				},
				thead: {
					color: "var(--colors-white)",
					borderBottomColor: "var(--colors-gray-400)",
				},
				"tbody tr": {
					borderBottomColor: "var(--colors-gray-600)",
				},
			},
		],
	},
});
