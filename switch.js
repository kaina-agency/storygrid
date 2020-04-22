const download = require('download-file')
const icon = process.env.ICON

var icon_options = {
	directory: './src/',
	filename: 'icon.png',
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
