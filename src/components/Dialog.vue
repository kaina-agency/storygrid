<template lang="pug">
v-dialog(v-model="dialog", eager, width="500")
	template(v-slot:activator="{ on }")
		div(v-on="on")
			component(
				v-for="blok in blok.activator",
				:key="blok._uid",
				:blok="blok",
				:is="blok.component"
			)
	component(
		v-for="blok in blok.content",
		:key="blok._uid",
		:blok="blok",
		:is="blok.component"
	)
</template>

<script>
	export default {
		props: ["blok"],
		data: () => ({ dialog: false }),
		mounted() {
			if (this.blok.auto_show && !localStorage[`${this.blok._uid}`]) {
				setTimeout(() => {
					this.dialog = true;
					localStorage[`${this.blok._uid}`] = true;
				}, this.blok.auto_show_delay * 1000 || 3000);
			}
		},
	};
</script>

<style>
	.v-dialog > .v-card > .v-card__text {
		padding-top: 20px !important;
	}
</style>