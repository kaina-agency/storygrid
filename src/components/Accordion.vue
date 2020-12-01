<template lang="pug">
v-expansion-panels(
	:accordion="blok.options.includes('dense')",
	:flat="blok.options.includes('flat')",
	:multiple="blok.options.includes('multiple')",
	:hover="blok.options.includes('hover')",
	:tile="blok.options.includes('tile')",
	:class="blok.class",
	:style="blok.style",
	v-model="panel"
)
	v-expansion-panel(
		v-for="blok in blok.content",
		:key="blok._uid",
		v-editable="blok"
	)
		v-expansion-panel-header(
			:color="color",
			:class="[blok.header.length ? 'pa-0' : '', 'pr-4']"
		)
			component(
				v-for="blok in blok.header",
				:key="blok._uid",
				:blok="blok",
				:is="blok.component",
				style="pointer-events: none"
			)
			.d-flex.align-center
				.g-icon.mr-2(v-html="blok.icon", notranslate)
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
		data: () => ({
			panel: null,
		}),
		computed: {
			color() {
				return this.blok.color ? this.blok.color : "var(--card-bg)";
			},
		},
		created() {
			if (this.blok.default_item) this.panel = this.blok.default_item - 1;
		},
	};
</script>