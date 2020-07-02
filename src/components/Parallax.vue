<template lang="pug">
	v-parallax(
		v-editable="blok"
		:src="blok.image"
		:height="blok.height"
		:class="['parallax text-shadow', 'blur-' + blok.blur, blok.class]"
	)
		.parallax-background(
			:class="blok.background_color"
			:style="`opacity: ${blok.background_opacity};`"
		)
		component(
			v-for="blok in blok.content"
			:key="blok._uid"
			:blok="blok"
			:is="blok.component"
		)
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>

<style lang="scss">
	.parallax {
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
		&-background {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
		&.blur-3 .v-parallax__image-container {
			filter: blur(3px);
		}
		&.blur-5 .v-parallax__image-container {
			filter: blur(5px);
		}
		&.blur-10 .v-parallax__image-container {
			filter: blur(10px);
		}
		&.blur-15 .v-parallax__image-container {
			filter: blur(15px);
		}
	}
</style>