<template lang="pug">
	.page-header(v-editable="blok")
		img.page-header__background--small(:src="image.small")
		img.page-header__background--large(:src="image.large")
		.page-header__text(:class="textClass")
			.page-header__text__background(
				:class="blok.background_color || 'black'"
				:style="textStyle"
			)
			.page-header__text__content(:style="{textAlign: blok.text_alignment}")
				h1(v-if="blok.header") {{blok.header}}
				p(v-if="blok.subheader") {{blok.subheader}}
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			image() {
				let img = this.blok.image;
				if (img.filename) {
					let service = "https://img2.storyblok.com";
					let focus = `/filters:focal(${img.focus})`;
					let smart = img.focus ? "" : "/smart";
					let asset = img.filename.replace("https://a.storyblok.com", "");

					let small = "/800x600";
					let large = "/1600x685";

					return {
						small: service + small + smart + focus + ":format(jpeg)" + asset,
						large: service + large + smart + focus + ":format(jpeg)" + asset
					};
				} else {
					return {};
				}
			},
			textClass() {
				return [
					this.blok.text_position || "bottom",
					this.blok.text_color || "white--text",
					this.blok.text_shadow ? "shadow" : "",
					this.blok.background_blur ? "blur" : ""
				];
			},
			textStyle() {
				return {
					opacity: this.blok.background_transparency || "0.66"
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	// < 1264
	.page-header {
		position: relative;
		img {
			width: 100%;
			object-fit: cover;
		}

		&__background {
			&--small {
				display: block;
				@media (min-width: 768px) {
					display: none;
				}
			}
			&--large {
				display: none;
				@media (min-width: 768px) {
					display: block;
				}
			}
		}

		&__text {
			&.blur {
				backdrop-filter: blur(5px);
			}
			&.shadow {
				text-shadow: 2px 2px 2px black;
			}
			display: flex;
			flex-direction: column;
			justify-content: center;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			&.center {
				top: 0;
			}
			&__background {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			&__content {
				position: relative;
				max-width: 1440px;
				margin: 0px auto;
				width: 100%;
				padding: 0 12px;
				@media (min-width: 1024px) {
					padding: 0 24px;
				}
			}
		}
	}
</style>