// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: process.env.GRIDSOME_TITLE,
	siteDescription: process.env.GRIDSOME_DESCRIPTION,
	port: 8080,
	plugins: [
		{
			use: 'gridsome-source-storyblok',
			options: {
				client: {
					accessToken: process.env.GRIDSOME_SB,
				},
			},
		}
	],
	chainWebpack: (config) => {
		config.module
			.rule('pug')
			.test(/\.pug$/)
			.use('pug-plain-loader')
			.loader('pug-plain-loader')
	},
}
