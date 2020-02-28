<template lang="pug">
	v-container(
		:class="[blok.bottom_margin, blok.shape, blok.class, full]"
		:style="blok.style"
		v-editable="blok"
	)
		component(
			v-for="blok in blok.content"
			:key="blok._uid"
			:blok="blok"
			:is="blok.component"
		)
</template>

<script>
	import { VContainer } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VContainer },
		computed: {
			full() {
				return this.blok.full_width ? "full" : "";
			}
		}
	};
</script>

<style scoped lang="scss">
	.container {
		position: relative;
		max-width: 1600px;

		@media (min-width: 1024px) {
			padding: 24px;
		}

		&.full {
			padding: 0;
			margin: 0 0;
			max-width: none;
		}

		&.bottom {
			&-curve {
				-webkit-clip-path: ellipse(100% 60% at 50% 40%);
				clip-path: ellipse(100% 60% at 50% 40%);
			}

			&-arrow {
				-webkit-clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
				clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
				padding-bottom: 36px;
			}

			&-lean {
				&-left {
					-webkit-clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
					clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
				}

				&-right {
					-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
					clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
				}
			}
		}

		&.slope {
			&-clockwise {
				-webkit-clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 92%);
				clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 92%);
			}

			&-counter-clockwise {
				-webkit-clip-path: polygon(0 8%, 100% 0, 100% 92%, 0 100%);
				clip-path: polygon(0 8%, 100% 0, 100% 92%, 0 100%);
			}
		}
	}
</style>