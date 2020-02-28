<template lang="pug">
div(:class="blok.class" :style="blok.style")
	v-tabs(
		v-model="tab"
		:background-color="color"
		:color="blok.color"
		:centered="blok.options.includes('centered')"
		:right="blok.options.includes('right')"
		v-editable="blok"
	)
		v-tab(
			v-for="blok in blok.content"
			:key="blok._uid"
			v-editable="blok"
		)
			v-icon.left(v-if="blok.icon")
				| {{'mdi mdi-' + blok.icon}}
			| {{blok.name}}
		v-tabs-slider
	v-divider
	v-tabs-items(v-model="tab" style="background-color: var(--card-bg);")
		v-tab-item(
			v-for="blok in blok.content"
			:key="blok._uid"
		)
			component(
				v-for="blok in blok.content"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
</template>

<script>
	import {
		VTabs,
		VTab,
		VTabsSlider,
		VTabsItems,
		VTabItem,
		VDivider
	} from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VTabs, VTab, VTabsSlider, VTabsItems, VTabItem, VDivider },
		data: () => ({ tab: null }),
		computed: {
			color() {
				return this.blok.background_color
					? this.blok.background_color
					: "var(--card-bg)";
			}
		}
	};
</script>

<style lang="scss">
	.v-tab > .v-icon.left {
		margin-right: 8px;
	}
</style>