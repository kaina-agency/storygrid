// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import DefaultLayout from '~/layouts/Default.vue'
import Page from '~/components/Page.vue'

import Button from '~/components/Button.vue'
import Card from '~/components/Card.vue'
import Carousel3D from '~/components/Carousel3D.vue'
import Column from '~/components/Column.vue'
import Container from '~/components/Container.vue'
import GoogleMap from '~/components/GoogleMap.vue'
import ImageG from '~/components/ImageG.vue'
import Masonry from '~/components/Masonry.vue'
import Row from '~/components/Row.vue'
import Spacer from '~/components/Spacer.vue'
import TextContent from '~/components/TextContent.vue'
import Typer from '~/components/Typer.vue'
import VideoBackground from '~/components/VideoBackground.vue'

export default function(
	Vue,
	{ router, head, isClient, appOptions }
) {
	Vue.use(Vuetify, {
		iconfont: 'mdi'
	})
	appOptions.vuetify = new Vuetify({
		theme: {
			options: {
				customProperties: true
			},
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

	Vue.component('Button', Button)
	Vue.component('Card', Card)
	Vue.component('Carousel3D', Carousel3D)
	Vue.component('Column', Column)
	Vue.component('Container', Container)
	Vue.component('GoogleMap', GoogleMap)
	Vue.component('ImageG', ImageG)
	Vue.component('Masonry', Masonry)
	Vue.component('Row', Row)
	Vue.component('Spacer', Spacer)
	Vue.component('TextContent', TextContent)
	Vue.component('Typer', Typer)
	Vue.component('VideoBackground', VideoBackground)
}
