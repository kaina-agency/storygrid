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
			:x-small="blok.size == 'xs'"
			:small="blok.size == 'sm'"
			:medium="blok.size == 'md'"
			:large="blok.size == 'lg'"
			:x-large="blok.size == 'xl'"
		)
			| {{'mdi mdi-' + blok.icon}}
		| {{blok.style == 'fab' || blok.style == 'icon' ? '' : blok.text}}
</template>

<script>
	export default {
		props: ["blok"],
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
			}
		}
	};
</script>
