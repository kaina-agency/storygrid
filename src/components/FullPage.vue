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
				<svg v-if="blok._uid === current" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" /></svg>
				<svg v-else width="24" height="24" viewBox="0 0 24 24"><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
</template>

<script>
	export default {
		props: ["blok"],
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

			// iOS scrolling fix
			let firstSlide = document.querySelectorAll(".fullpage_slide")[0];
			firstSlide.scrollIntoView();
			setTimeout(() => {
				firstSlide.scrollIntoView();
			}, 100);
			// setTimeout(() => {
			// 	firstSlide.scrollIntoView();
			// }, 200);
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
		left: 0;
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		&::-webkit-scrollbar {
			display: none !important;
		}

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

				svg {
					fill: white;
				}
			}
		}
	}
</style>