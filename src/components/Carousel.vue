<template lang="pug">
v-carousel(
	v-editable="blok",
	:class="blok.options.includes('vertical') ? 'vertical' : ''",
	:cycle="blok.options.includes('cycle')",
	:height="blok.height",
	:hide-delimiter-background="blok.options.includes('hide-delimiter-background')",
	:hide-delimiters="blok.options.includes('hide-delimiters')",
	:interval="blok.interval",
	:progress-color="blok.progress_color",
	:progress="blok.progress_color.length > 0",
	:show-arrows="arrows",
	:style="blok.style",
	:vertical="blok.options.includes('vertical')"
)
	v-carousel-item(v-for="blok in blok.content", :key="blok._uid")
		component(:blok="blok", :is="blok.component", style="min-height: 100%;")
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			arrows() {
				if (this.blok.options.includes("hide-arrows")) {
					return false;
				} else if (this.blok.options.includes("vertical")) {
					return false;
				} else {
					return true;
				}
			},
		},
	};
</script>

<style lang="scss">
	.vertical {
		.v-carousel__controls {
			width: 50px;
			left: unset;
			right: 0 !important;
			top: 0;
			height: 100%;
			justify-content: center;

			> .v-item-group {
				display: flex;
				flex-direction: column;
			}

			&__item {
				margin: 8px 0;
			}
		}
	}
</style>