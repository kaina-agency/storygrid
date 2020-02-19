const download = require('download-file')
const os = require('os')
const fs = require('fs')

const icon = process.env.ICON

var icon_options = {
	directory: './src/.temp/',
	filename: 'icon.png'
}

download(icon, icon_options, function(err) {
	if (err) {
		console.error(err)
	} else {
		console.log('Icon downloaded from Storyblok')
	}
})

let sb = 'SB=' + process.env.SB + os.EOL

let content = sb

fs.writeFile('./.env', content, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('.env file written from Netlify')
	}
})
