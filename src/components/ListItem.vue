<template lang="pug">
	v-list-item(
		:active-class="activeClass"
		:disabled="blok.disabled"
		:href="href"
		:to="to"
		v-editable="blok"
	)
		v-list-item-avatar(
			v-if="blok.avatar.filename || blok.icon" 
			:class="[blok.avatar_color, blok.avatar_color.length > 0 ? 'filled' : '']"
		)
			img(v-if="blok.avatar.filename" :src="image(blok.avatar)" height="100%" width="100%")
			div.g-icon(
				v-if="!blok.avatar.filename"
				v-html="blok.icon"
				notranslate
			)
		v-list-item-content
			v-list-item-title(:class="blok.subtitle ? '' : 'mb-0'") {{blok.title}}
			v-list-item-subtitle {{blok.subtitle}}
</template>

<script>
	export default {
		props: ["blok", "activeClass"],
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
		},
		methods: {
			image(img) {
				if (img.filename) {
					let asset = img.filename.replace("https://a.storyblok.com", "");
					return (
						"https://img2.storyblok.com/100x100/smart/filters:format(jpg)" + asset
					);
				} else {
					return undefined;
				}
			}
		}
	};
</script>

<style lang="scss">
	.v-avatar.filled .g-icon svg {
		height: 20px;
		width: 20px;
		fill: white;
	}
	.v-avatar svg {
		display: block;
	}
</style>