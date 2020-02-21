// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify, {
	VApp,
	VAppBar,
	VAppBarNavIcon,
	VContent,
	VIcon,
	VNavigationDrawer
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import '@mdi/font/css/materialdesignicons.css'

import DefaultLayout from '~/layouts/Default.vue'
import Page from '~/components/Page.vue'

import Button from '~/components/Button.vue'
import Card from '~/components/Card.vue'
import Carousel from '~/components/Carousel.vue'
import Carousel3D from '~/components/Carousel3D.vue'
import Column from '~/components/Column.vue'
import Container from '~/components/Container.vue'
import Form from '~/components/Form.vue'
import GoogleMap from '~/components/GoogleMap.vue'
import ImageG from '~/components/ImageG.vue'
import List from '~/components/List.vue'
import ListItem from '~/components/ListItem.vue'
import Masonry from '~/components/Masonry.vue'
import Row from '~/components/Row.vue'
import Spacer from '~/components/Spacer.vue'
import TextContent from '~/components/TextContent.vue'
import Typer from '~/components/Typer.vue'
import Video from '~/components/Video.vue'
import VideoBackground from '~/components/VideoBackground.vue'

export default function(
	Vue,
	{ router, head, isClient, appOptions }
) {
	Vue.use(Vuetify, {
		components: {
			VApp,
			VAppBar,
			VAppBarNavIcon,
			VContent,
			VIcon,
			VNavigationDrawer
		},
		directives: {
			Ripple
		}
	})
	appOptions.vuetify = new Vuetify({
		theme: {
			options: {
				customProperties: true,
				minifyTheme: function(css) {
					return process.env.NODE_ENV === 'production'
						? css.replace(/[\r\n|\r|\n]/g, '')
						: css
				}
			}
		}
	})

	// Set default layout as a global component
	Vue.component('Layout', DefaultLayout)
	Vue.component('Page', Page)

	Vue.component('Button', Button)
	Vue.component('Card', Card)
	Vue.component('Carousel', Carousel)
	Vue.component('Carousel3D', Carousel3D)
	Vue.component('Column', Column)
	Vue.component('Container', Container)
	Vue.component('Form', Form)
	Vue.component('GoogleMap', GoogleMap)
	Vue.component('ImageG', ImageG)
	Vue.component('List', List)
	Vue.component('ListItem', ListItem)
	Vue.component('Masonry', Masonry)
	Vue.component('Row', Row)
	Vue.component('Spacer', Spacer)
	Vue.component('TextContent', TextContent)
	Vue.component('Typer', Typer)
	Vue.component('Video', Video)
	Vue.component('VideoBackground', VideoBackground)
}
