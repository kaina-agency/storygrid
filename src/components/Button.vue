<template lang="pug">
	v-btn(
		:color="blok.color"
		:depressed="blok.style == 'depressed'"
		:fab="blok.style == 'fab'"
		:href="href"
		:icon="blok.style == 'icon'"
		:outlined="blok.style == 'outlined'"
		:replace="blok.link.linktype == 'story'"
		ripple
		:rounded="blok.style == 'rounded'"
		:text="blok.style == 'text'"
		:tile="blok.style == 'tile'"
		:to="to"
		:x-small="blok.size == 'xs'"
		:small="blok.size == 'sm'"
		:medium="blok.size == 'md'"
		:large="blok.size == 'lg'"
		:x-large="blok.size == 'xl'"
		v-editable="blok"
	) 
		v-icon(
			v-if="blok.icon"
			:left="blok.style == 'fab' || blok.style == 'icon' ? false : true"
		)
			| {{'mdi mdi-' + blok.icon}}
		| {{blok.style == 'fab' || blok.style == 'icon' ? '' : blok.text}}
</template>

<script>
	import { VBtn } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VBtn },
		computed: {
			href() {
				const b = this.blok;
				if (b.link.linktype == "story") {
					return "";
				} else if (b.link.linktype == "url") {
					return b.link.url;
				} else if (b.link.linktype == "email") {
					return "mailto:" + b.link.url;
				} else if (b.link.linktype == "asset") {
					return b.link.url;
				} else {
					return "";
				}
			},
			to() {
				let b = this.blok;
				let path = b.link.cached_url == "home" ? "" : b.link.cached_url;
				if (b.link.linktype == "story") {
					return "/" + path;
				}
			}
		}
	};
</script>
