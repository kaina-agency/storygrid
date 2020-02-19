// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: 'StoryGrid',
	siteDescription: 'Remember to update this',
	icon: './src/.temp/icon.png',
	plugins: [
		{
			use: 'gridsome-source-storyblok',
			options: {
				client: {
					accessToken: process.env.SB
				}
			}
		}
	],
	chainWebpack: config => {
		config.module
			.rule('pug')
			.test(/\.pug$/)
			.use('pug-plain-loader')
			.loader('pug-plain-loader')
	}
}
