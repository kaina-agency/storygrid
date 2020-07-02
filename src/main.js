// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// Import components

import DefaultLayout from '~/layouts/Default.vue'
import Page from '~/components/Page.vue'

import Accordion from '~/components/Accordion.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import Button from '~/components/Button.vue'
import Card from '~/components/Card.vue'
import Carousel from '~/components/Carousel.vue'
import CarouselSlide from '~/components/CarouselSlide.vue'
import Carousel3D from '~/components/Carousel3D.vue'
import Column from '~/components/Column.vue'
import Container from '~/components/Container.vue'
import Dialog from '~/components/Dialog.vue'
import Form from '~/components/Form.vue'
import FormInput from '~/components/FormInput.vue'
import FullPage from '~/components/FullPage.vue'
import GoogleMap from '~/components/GoogleMap.vue'
import ImageG from '~/components/ImageG.vue'
import List from '~/components/List.vue'
import ListItem from '~/components/ListItem.vue'
import Masonry from '~/components/Masonry.vue'
import Parallax from '~/components/Parallax.vue'
import Posts from '~/components/Posts.vue'
import Row from '~/components/Row.vue'
import SimpleCard from '~/components/SimpleCard.vue'
import SimpleGrid from '~/components/SimpleGrid.vue'
import Spacer from '~/components/Spacer.vue'
import Tabs from '~/components/Tabs.vue'
import TextContent from '~/components/TextContent.vue'
import Toolbar from '~/components/Toolbar.vue'
import Typer from '~/components/Typer.vue'
import Video from '~/components/Video.vue'
import VideoBackground from '~/components/VideoBackground.vue'

export default function(Vue, { router, head, isClient, appOptions }) {
	// Assign Components
	Vue.component('Layout', DefaultLayout)
	Vue.component('Page', Page)

	Vue.component('Accordion', Accordion)
	Vue.component('Breadcrumbs', Breadcrumbs)
	Vue.component('Button', Button)
	Vue.component('Card', Card)
	Vue.component('Carousel', Carousel)
	Vue.component('CarouselSlide', CarouselSlide)
	Vue.component('Carousel3D', Carousel3D)
	Vue.component('Column', Column)
	Vue.component('Container', Container)
	Vue.component('Dialog', Dialog)
	Vue.component('Form', Form)
	Vue.component('FormInput', FormInput)
	Vue.component('FullPage', FullPage)
	Vue.component('GoogleMap', GoogleMap)
	Vue.component('ImageG', ImageG)
	Vue.component('List', List)
	Vue.component('ListItem', ListItem)
	Vue.component('Masonry', Masonry)
	Vue.component('Parallax', Parallax)
	Vue.component('Posts', Posts)
	Vue.component('Row', Row)
	Vue.component('SimpleCard', SimpleCard)
	Vue.component('SimpleGrid', SimpleGrid)
	Vue.component('Spacer', Spacer)
	Vue.component('Tabs', Tabs)
	Vue.component('TextContent', TextContent)
	Vue.component('Toolbar', Toolbar)
	Vue.component('Typer', Typer)
	Vue.component('Video', Video)
	Vue.component('VideoBackground', VideoBackground)

	Vue.use(Vuetify)
	appOptions.vuetify = new Vuetify({
		icons: { iconfont: 'mdiSvg' },
		theme: {
			options: {
				customProperties: true,
				minifyTheme: function(css) {
					return process.env.NODE_ENV === 'production'
						? css.replace(/[\r\n|\r|\n]/g, '')
						: css
				},
			},
		},
	})
}
