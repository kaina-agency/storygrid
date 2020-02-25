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
	export default {
		props: ["blok"],
		components: { VBtn: () => import("vuetify/lib/components/VBtn") },
		computed: {
			href() {
				const l = this.blok.link;
				switch (l.linktype) {
					case "story":
						return "";
						break;
					case "url":
						return l.url;
						break;
					case "email":
						return "mailto:" + l.url;
						break;
					case "asset":
						return l.url;
						break;
				}
			},
			to() {
				const l = this.blok.link;
				let path = l.cached_url;
				if (l.linktype == "story") {
					switch (path) {
						case "home":
							return "/";
							break;
						case "":
							return undefined;
						default:
							return "/" + path;
					}
				}
			}
		}
	};
</script>
