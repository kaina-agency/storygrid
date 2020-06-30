<template lang="pug">
	v-expansion-panels(
		:accordion="blok.options.includes('dense')"
		:flat="blok.options.includes('flat')"
		:multiple="blok.options.includes('multiple')"
		:hover="blok.options.includes('hover')"
		:tile="blok.options.includes('tile')"
		:class="blok.class"
		:style="blok.style"
	)
		v-expansion-panel(
			v-for="blok in blok.content"
			:key="blok._uid"
			v-editable="blok"
		)
			v-expansion-panel-header(:color="color")
				v-list-item-avatar(
					v-if="blok.icon"
					class="expansion-icon"
				)
					div.g-icon(
						v-html="blok.icon"
						notranslate
					)
				| {{blok.title}}
			v-expansion-panel-content(:color="color")
				component(
					v-for="blok in blok.content"
					:key="blok._uid"
					:blok="blok"
					:is="blok.component"
				)
</template>

<script>
	import {
		VExpansionPanels,
		VExpansionPanel,
		VExpansionPanelHeader,
		VExpansionPanelContent
	} from "vuetify/lib";
	export default {
		props: ["blok"],
		components: {
			VExpansionPanels,
			VExpansionPanel,
			VExpansionPanelHeader,
			VExpansionPanelContent
		},
		computed: {
			color() {
				return this.blok.color ? this.blok.color : "var(--card-bg)";
			}
		}
	};
</script>

<style>
	.v-expansion-panel-header {
		font-size: 1rem;
	}
	.expansion-icon {
		flex: 0 0 auto !important;
		margin-right: 8px;
		width: 40px;
	}
</style>