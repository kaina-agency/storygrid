// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: process.env.GRIDSOME_TITLE,
	siteDescription: 'Remember to update this',
	icon: './src/icon.png',
	plugins: [
		{
			use: 'gridsome-source-storyblok',
			options: {
				client: {
					accessToken: process.env.GRIDSOME_SB,
				},
			},
		},
		{
			use: '@gridsome/plugin-google-analytics',
			options: {
				id: process.env.GRIDSOME_GA,
			},
		},
	],
	chainWebpack: (config) => {
		config.module
			.rule('pug')
			.test(/\.pug$/)
			.use('pug-plain-loader')
			.loader('pug-plain-loader')
	},
}
