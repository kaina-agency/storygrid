<template lang="pug">
.carousel-slide
	ImageG.carousel-slide-image(:blok="blok.image[0]")
	.carousel-slide-background(
		:class="blok.background_color",
		:style="`opacity: ${blok.background_opacity};`"
	)
	.carousel-slide-content(
		:class="[blok.text_color, blok.dark ? 'white--text text-shadow' : '', blok.class]",
		:style="blok.style",
		v-editable="blok"
	)
		component.my-2(v-if="blok.header", :is="'h' + blok.heading_level || 'h2'") {{ blok.header }}
		component.my-2(
			v-if="blok.subheader",
			:is="'h' + blok.subheading_level || 'h3'"
		) {{ blok.subheader }}
		p.my-2(v-if="blok.text") {{ blok.text }}
		Button.mt-4.mb-2(:blok="blok.button[0]")
</template>

<script>
	import { Button } from "./Button";
	import { ImageG } from "./ImageG";
	export default {
		props: ["blok"],
	};
</script>

<style lang="scss">
	.carousel-slide {
		position: relative;
		display: flex;
		&-image,
		&-content,
		&-background {
			position: absolute !important;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
		&-image {
			padding-top: 0 !important;
		}
		&-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			padding: 0 68px;
			&.text-shadow {
				h1,
				h2,
				h3,
				h4,
				h5,
				h6,
				p {
					text-shadow: 1px 1px 2px black;
				}
			}
		}
	}
</style>