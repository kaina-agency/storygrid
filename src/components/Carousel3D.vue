<template lang="pug">
	carousel-3d(
		:animationSpeed="blok.animationSpeed * 1000"
		:autoplay="blok.autoplay"
		:autoplayHoverPause="blok.autoplayHoverPause"
		:autoplayTimeout="blok.autoplayTimeout * 1000"
		:border="blok.border"
		:display="blok.display"
		:height="blok.height"
		:loop="blok.loop"
		:perspective="blok.perspective"
		:space="blok.space || 'auto'"
		:width="blok.width"
		v-editable="blok"
	)
		slide(
			v-for="(blok, index) in blok.content"
			:index="index", :key="blok._uid"
			:class="contentClass"
			:style="contentStyle"
		)
			component(:is="blok.component" :blok="blok")
</template>

<script>
	import { Carousel3d, Slide } from "vue-carousel-3d";
	export default {
		props: ["blok"],
		components: {
			Carousel3d,
			Slide
		},
		computed: {
			contentClass() {
				return this.blok.contentClass;
			},
			contentStyle() {
				return this.blok.contentStyle;
			}
		}
	};
</script>
