<template lang="pug">
	v-tabs(
		v-model="tab"
		:background-color="blok.background_color"
		:color="blok.color"
		:centered="blok.options.includes('centered')"
		:right="blok.options.includes('right')"
		:vertical="blok.options.includes('vertical')"
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
		v-tabs-items(v-model="tab")
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
	import { VTabs, VTab, VTabsSlider, VTabsItems, VTabItem } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VTabs, VTab, VTabsSlider, VTabsItems, VTabItem },
		data: () => ({ tab: null })
	};
</script>

<style lang="scss">
	.v-tab > .v-icon.left {
		margin-right: 8px;
		font-size: 18px;
	}

	.v-tabs--vertical .v-tab {
		text-align: left;
		display: flex;
		justify-content: flex-start;
	}
</style>