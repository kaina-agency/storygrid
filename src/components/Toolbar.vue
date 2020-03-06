<template lang="pug">
	v-toolbar(
		color="primary"
		:dark="blok.options.includes('dark')"
		:dense="blok.options.includes('dense')"
		:flat="blok.options.includes('flat')"
		:short="blok.options.includes('short')"
		:tag="blok.tag"
		:tile="blok.options.includes('tile')"
		:class="blok.class"
		:style="blok.style"
		v-editable="blok"
	)
		v-toolbar-title {{blok.text}}
		v-spacer
		component(
			v-for="blok in blok.content"
			:key="blok._uid"
			:blok="blok"
			:is="blok.component"
		)
</template>

<script>
	import { VToolbar, VToolbarTitle, VSpacer } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VToolbar, VToolbarTitle, VSpacer }
	};
</script>