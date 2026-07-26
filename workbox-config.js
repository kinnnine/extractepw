module.exports = {
	globDirectory: 'dist',
	globPatterns: [
		'**/*.{json,html,js,css}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};