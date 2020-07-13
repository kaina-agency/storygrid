<template lang="pug">
	v-card(
		v-editable="blok"
		:class="[blok.shape === 'rounded' ? 'rounded' : '', blok.blend ? 'transparent' : '', blok.class]"
		:style="blok.style"
		:flat="blok.blend ? true : blok.flat"
		:href="blok.button_text ? undefined : href"
		:outlined="blok.blend ? false : blok.flat"
		:shaped="blok.shape === 'goofy'"
		:tile="blok.shape === 'tile'"
		:to="blok.button_text ? undefined : to"
	)
		picture(v-if="blok.image.filename")
			source(:src="image.webp" type="image/webp")
			source(:src="image.png" type="image/png")
			img(
				:src="image.png"
				:alt="image.alt"
				style="width: 100%; display: block;"
			)
		v-card-text(v-if="blok.text.content[0].content")
			.rich-text(v-html="richtext")
		v-card-actions(v-if="(blok.link.url || blok.link.cached_url) && blok.button_text")
			v-btn(color="accent" :href="href" text :to="to") {{blok.button_text || 'Change This'}}
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			image() {
				let img = this.blok.image;
				let crop = this.blok.image_crop;
				let service = "https://img2.storyblok.com";
				let size = crop ? "/" + crop : "";
				let smart = img.focus ? "" : "/smart";
				let focus = `/filters:focal(${img.focus})`;
				let asset = img.filename.replace("https://a.storyblok.com", "");
				let alt = img.alt || img.name;

				let webp = service + size + smart + focus + ":format(webp)" + asset;
				let png = service + size + smart + focus + ":format(png)" + asset;

				return {
					webp: webp,
					png: png,
					alt: alt
				};
			},
			richtext() {
				return this.$storyapi.richTextResolver.render(this.blok.text);
			},
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	.v-card.rounded {
		border-radius: 20px;
	}
</style>