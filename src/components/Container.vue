<template lang="pug">
	v-container(
		:class="[blok.bottom_margin, blok.class, full]"
		:style="blok.style"
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
		props: ["blok"],
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
	}
</style>