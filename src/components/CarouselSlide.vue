<template lang="pug">
	.carousel-slide
		ImageG(:blok="blok.image[0]" class="carousel-slide-image")
		.carousel-slide-background(
			:class="blok.background_color"
			:style="`opacity: ${blok.background_opacity};`"
		)
		.carousel-slide-content(
			:class="[blok.text_color, blok.text_shadow ? 'text-shadow' : '', blok.class]"
			:style="blok.style"
			v-editable="blok"
		)
			component(v-if="blok.header" :is="'h'+blok.heading_level || 'h2'" class="my-2") {{blok.header}}
			component(v-if="blok.subheader" :is="'h'+blok.subheading_level || 'h3'" class="my-2") {{blok.subheader}}
			p(v-if="blok.text" class="my-2") {{blok.text}}
			Button(:blok="blok.button[0]" class="mt-4 mb-2")
</template>

<script>
	import { Button } from "./Button";
	import { ImageG } from "./ImageG";
	export default {
		props: ["blok"]
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