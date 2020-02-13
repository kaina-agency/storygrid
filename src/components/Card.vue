<template lang="pug">
	v-card(
		:flat="blok.options.includes('flat')"
		:hover="blok.options.includes('hover')"
		:outlined="blok.options.includes('outlined')"
		:raised="blok.options.includes('raised')"
		:shaped="blok.options.includes('shaped')"
		:tile="blok.options.includes('tile')"
		v-editable="blok"
	)
		component(
				v-for="blok in blok.media"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-divider(v-if="blok.media && blok.content && blok.options.includes('separators')")
		v-card-text(v-if="(blok.content || {}).length")
			component(
				v-for="blok in blok.content"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-divider(v-if="blok.content && blok.actions && blok.options.includes('separators')")
		v-card-actions(v-if="(blok.actions || {}).length")
			component(
				v-for="blok in blok.actions"
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
	.v-card {
		.rich-text {
			*:first-child {
				margin-top: 0;
			}
			*:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>