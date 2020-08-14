<template lang="pug">
v-list-item(
	:active-class="activeClass",
	:disabled="blok.disabled",
	:href="href",
	:to="to",
	exact,
	v-editable="blok",
	@click="hashHandler"
)
	v-list-item-avatar(
		v-if="blok.avatar.filename || blok.icon",
		:class="[blok.avatar_color, blok.avatar_color.length > 0 ? 'filled' : '']",
		style="justify-content: center;"
	)
		img(
			v-if="blok.avatar.filename",
			:src="image(blok.avatar)",
			height="100%",
			width="100%"
		)
		v-icon(v-if="!blok.avatar.filename", ref="icon", :color="blok.icon_color")
	v-list-item-content
		v-list-item-title(:class="blok.subtitle ? '' : 'mb-0'") {{ blok.title }}
		v-list-item-subtitle {{ blok.subtitle }}
</template>

<script>
	export default {
		props: ["blok", "activeClass"],
		mounted() {
			if (this.blok.icon) {
				this.$refs.icon.$el.innerHTML = this.blok.icon;
			}
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
						return "mailto:" + l.email;
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
			},
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
			},
			hashHandler() {
				let l = this.blok.link;
				if (l.linktype === "url" && l.url.startsWith("#")) {
					let name = l.url.replace("#", "");
					document.querySelector(`[data-name='${name}'`).scrollIntoView();
				}
			},
		},
	};
</script>

<style>
	.v-avatar svg {
		height: auto;
		width: auto;
		border-radius: unset;
	}
	.theme--light.v-icon {
		color: black;
	}
</style>