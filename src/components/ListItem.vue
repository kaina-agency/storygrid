<template lang="pug">
	v-list-item(
		:href="href"
		:to="to"
		v-editable="blok"
		)
		v-list-item-avatar(
			v-if="blok.avatar || blok.icon" 
			:class="blok.avatar_color"
		)
			component(
				v-for="blok in blok.avatar"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
			v-icon(v-if="!blok.avatar.length > 0")
				| {{'mdi mdi-' + blok.icon}}
		v-list-item-content
			v-list-item-title {{blok.title}}
			v-list-item-subtitle {{blok.subtitle}}
</template>

<script>
	import {
		VListItem,
		VListItemAvatar,
		VListItemContent,
		VListItemTitle,
		VListItemSubtitle
	} from "vuetify/lib";
	export default {
		props: ["blok"],
		components: {
			VListItem,
			VListItemAvatar,
			VListItemContent,
			VListItemTitle,
			VListItemSubtitle
		},
		computed: {
			href() {
				let b = this.blok;
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