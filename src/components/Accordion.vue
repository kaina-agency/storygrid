<template lang="pug">
v-expansion-panels(
	:accordion="blok.options.includes('dense')",
	:flat="blok.options.includes('flat')",
	:multiple="blok.options.includes('multiple')",
	:hover="blok.options.includes('hover')",
	:tile="blok.options.includes('tile')",
	:class="blok.class",
	:style="blok.style"
)
	v-expansion-panel(
		v-for="blok in blok.content",
		:key="blok._uid",
		v-editable="blok"
	)
		v-expansion-panel-header(:color="color")
			component(
				v-for="blok in blok.header",
				:key="blok._uid",
				:blok="blok",
				:is="blok.component"
			)
			v-list-item-avatar.expansion-icon(v-if="blok.icon")
				.g-icon(v-html="blok.icon", notranslate)
			span(v-if="blok.title") {{ blok.title }}
		v-expansion-panel-content(:color="color")
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
		computed: {
			color() {
				return this.blok.color ? this.blok.color : "var(--card-bg)";
			},
		},
	};
</script>

<style>
	.v-list-item-group .v-expansion-panel-header {
		font-size: 1rem;
		padding: 0 16px;
	}
	.expansion-icon {
		flex: 0 0 auto !important;
		margin-right: 8px;
		width: 40px;
	}
</style>