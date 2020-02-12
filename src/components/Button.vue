<template lang="pug">
	v-btn(
		:color="blok.color"
		:depressed="blok.style == 'depressed'"
		exact
		:fab="blok.style == 'fab'"
		:href="href"
		:icon="blok.style == 'icon'"
		:outlined="blok.style == 'outlined'"
		:replace="blok.link.linktype == 'story'"
		ripple
		:rounded="blok.style == 'rounded'"
		:text="blok.style == 'text'"
		:tile="blok.style == 'tile'"
		:to="blok.link.linktype == 'story' ? '/' + blok.link.cached_url : ''"
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
	export default {
		props: ["blok"],
		computed: {
			href() {
				if (this.blok.link.linktype == "story") {
					return "";
				} else if (this.blok.link.linktype == "url") {
					return this.blok.link.url;
				} else if (this.blok.link.linktype == "email") {
					return "mailto:" + this.blok.link.url;
				} else if (this.blok.link.linktype == "asset") {
					return this.blok.link.url;
				} else {
					return "";
				}
			}
		}
	};
</script>
