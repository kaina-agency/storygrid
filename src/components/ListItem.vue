<template lang="pug">
	v-list-item(
		:href="href"
		:to="to"
		v-editable="blok"
		)
		v-list-item-avatar(
			v-if="blok.avatar || blok.icon" 
			:class="[blok.avatar_color, blok.avatar_color.length > 0 ? 'filled' : '']"
		)
			component(
				v-for="blok in blok.avatar"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
			v-icon(
				v-if="!blok.avatar.length > 0" :color="blok.icon_color"
			)
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

<style>
	.v-avatar.filled .v-icon:before {
		font-size: 20px;
	}
</style>