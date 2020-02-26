<template lang="pug">
	v-dialog(
		v-model="dialog"
		eager
		width="500"
	)
		template(v-slot:activator="{ on }")
			div(v-on="on")
				component(
					v-for="blok in blok.activator"
					:key="blok._uid"
					:blok="blok"
					:is="blok.component"
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
		components: { VDialog: () => import("vuetify/lib/components/VDialog") },
		data: () => ({ dialog: false })
	};
</script>

<style>
	.v-dialog > .v-card > .v-card__text {
		padding-top: 24px;
	}
</style>