// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DefaultLayout from '~/layouts/Default.vue'
import Page from '~/components/Page.vue'
import Teaser from '~/components/Teaser.vue'
import Feature from '~/components/Feature.vue'
import Grid from '~/components/Grid.vue'
import Richtext from '~/components/Richtext.vue'
import MyImage from '~/components/MyImage.vue'

export default function (Vue, { router, head, isClient, appOptions }) {
	Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify({})
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.component('Page', Page)
  Vue.component('Teaser', Teaser)
  Vue.component('Feature', Feature)
  Vue.component('Grid', Grid)
  Vue.component('Richtext', Richtext)
  Vue.component('MyImage', MyImage)
}
