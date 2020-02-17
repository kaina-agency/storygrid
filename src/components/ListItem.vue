<template lang="pug">
	v-list-item(
		:href="href"
		:to="blok.link.linktype == 'story' ? '/' + blok.link.cached_url : ''"
		)
		v-list-item-avatar(v-if="blok.avatar || blok.icon")
			component(
				v-for="blok in blok.avatar"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
			v-icon( v-if="!blok.avatar.length > 0" v-text="'mdi mdi-' + blok.icon")
		v-list-item-content
			v-list-item-title {{blok.title}}
			v-list-item-subtitle {{blok.subtitle}}
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