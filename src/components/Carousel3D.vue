<template lang="pug">
no-ssr
	carousel-3d(
		:autoplay="blok.autoplay",
		:autoplayHoverPause="blok.autoplayHoverPause",
		:autoplayTimeout="blok.autoplayTimeout * 1000",
		:border="blok.border",
		:display="blok.display",
		:height="blok.height",
		:loop="blok.loop",
		:perspective="blok.perspective",
		:space="blok.space || 'auto'",
		:width="blok.width",
		v-editable="blok"
	)
		slide(
			v-for="(blok, index) in blok.content",
			:index="index",
			:key="blok._uid",
			:class="contentClass",
			:style="contentStyle"
		)
			component(:is="blok.component", :blok="blok")
</template>

<script>
	// import { Carousel3d, Slide } from "vue-carousel-3d/src/index.js";
	import NoSSR from "vue-no-ssr";

	export default {
		props: ["blok"],
		components: {
			"no-ssr": NoSSR,
			Carousel3d: () =>
				import("vue-carousel-3d")
					.then((m) => m.Carousel3d)
					.catch(),
			Slide: () =>
				import("vue-carousel-3d")
					.then((m) => m.Slide)
					.catch(),
		},
		computed: {
			contentClass() {
				return this.blok.contentClass;
			},
			contentStyle() {
				return this.blok.contentStyle;
			},
		},
	};
</script>
