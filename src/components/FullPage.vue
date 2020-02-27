<template lang="pug">
	.fullpage_wrapper
		.fullpage(
			:class="blok.class"
			:style="blok.style"
			@scroll="scrollHandler"
		)
			component(
				v-for="blok in blok.content"
				:key="blok._uid"
				:is="blok.component"
				:blok="blok"
				class="fullpage_slide"
				:id="'blok-' + blok._uid"
				:ref="blok._uid"
			)
		.fullpage_indicators
			v-btn(
				v-for="blok in blok.content"
				:key="blok._uid"
				@click="scrollToSlide(blok)"
				color="white"
				text
				ripple
				icon
				v-bind="size"
			)
				v-icon(v-bind="size")
					|	{{blok._uid === current ? "mdi-circle" : "mdi-circle-outline"}}
</template>

<script>
	import { VBtn } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VBtn },
		data: () => ({ current: "" }),
		methods: {
			scrollToSlide(blok) {
				let fullpage_slide = document.querySelector(`#blok-${blok._uid}`);
				fullpage_slide.scrollIntoView();
			},
			scrollHandler() {
				const fullpage = this.$el.childNodes[0];
				let slides = fullpage.childNodes;
				let current = Math.floor(
					(fullpage.scrollTop + fullpage.clientHeight / 2) / fullpage.clientHeight
				);
				this.current = slides[current].id.replace("blok-", "");
			}
		},
		mounted() {
			this.scrollHandler();
		},
		computed: {
			size() {
				let size = {};
				size[this.blok.indicator_size] = true;
				return size;
			}
		}
	};
</script>

<style lang="scss">
	.fullpage {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow-y: scroll;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;

		&_slide,
		&_slide img {
			height: 100%;
			width: 100%;
			min-height: 100%;
			max-height: 100%;
			min-width: 100%;
			max-width: 100%;
			scroll-snap-align: start;
			overflow: hidden;
			margin: 0 0 !important;
		}

		&_indicators {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			pointer-events: none;

			.v-btn {
				pointer-events: all;

				.v-icon {
					text-shadow: 1px 1px 2px black;
				}
			}
		}
	}
</style>