<template lang="pug">
	v-col(
		:cols="responsive.xs"
		:sm="responsive.sm"
		:md="responsive.md"
		:lg="responsive.lg"
		:xl="responsive.xl"
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
	export default {
		props: ["blok"],
		computed: {
			responsive() {
				let r = this.blok.responsive;
				return {
					xs: r.xsmall,
					sm: r.small || r.xsmall,
					md: r.medium || r.small || r.xsmall,
					lg: r.large || r.medium || r.small || r.xsmall,
					xl: r.xlarge || r.large || r.medium || r.small || r.xsmall
				};
			}
		}
	};
</script>

<style scoped>
</style>