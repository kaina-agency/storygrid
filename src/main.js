// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import DefaultLayout from '~/layouts/Default.vue'
import Page from '~/components/Page.vue'
import Markdown from '~/components/Markdown.vue'
import Button from '~/components/Button.vue'
import Spacer from '~/components/Spacer.vue'
import Grid from '~/components/Grid.vue'
import Richtext from '~/components/Richtext.vue'
import Container from '~/components/Container.vue'

export default function(
	Vue,
	{ router, head, isClient, appOptions }
) {
	Vue.use(Vuetify, {
		iconfont: 'mdi'
	})
	appOptions.vuetify = new Vuetify({
		theme: {
			themes: {
				light: {
					primary: '#2979FF',
					secondary: '#EEEEEE',
					accent: '#651FFF'
				}
			}
		}
	})
	// Set default layout as a global component
	Vue.component('Layout', DefaultLayout)

	Vue.component('Page', Page)
	Vue.component('Markdown', Markdown)
	Vue.component('Button', Button)
	Vue.component('Spacer', Spacer)
	Vue.component('Grid', Grid)
	Vue.component('Richtext', Richtext)
	Vue.component('Container', Container)
}
