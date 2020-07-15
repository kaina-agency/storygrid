<template lang="pug">
	.simple-grid(v-editable="blok")
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
	.simple-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 1rem;

		.v-card {
			display: flex !important;
			flex-direction: column;

			&__text {
				flex-grow: 1;
			}
		}
	}
</style>