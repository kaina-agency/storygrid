<template lang="pug">
	ClientOnly
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
	export default {
		props: ["blok"],
		components: {
			Carousel3d: () => import("vue-carousel-3d"),
			Slide: () => import("vue-carousel-3d")
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
