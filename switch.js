const download = require('download-file')
const os = require('os')
const fs = require('fs')
const icon = process.env.ICON

// update .env file

let sb = 'GRIDSOME_SB=' + process.env.GRIDSOME_SB + os.EOL
let t = 'GRIDSOME_TITLE=' + process.env.GRIDSOME_TITLE + os.EOL

let content = sb + t

fs.writeFile('./.env', content, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(
			'\n\n',
			'.env file written from Netlify build settings'
		)
	}
})

// update icon

var icon_options = {
	directory: './src/',
	filename: 'icon.png'
}

if (icon) {
	download(icon, icon_options, function(err) {
		if (err) {
			console.error(err)
		} else {
			console.log('\n\n', 'Icon updated')
		}
	})
} else {
	console.log('\n\n', 'No icon set')
}
