<template lang="pug">
	v-list(
		:class="addedStyles"
		dense
		:nav="blok.style == 'nav'"
		:rounded="blok.style == 'rounded'"
		:shaped="blok.style == 'shaped'"
		:three-line="blok.line_cap == 'three'"
		:two-line="blok.line_cap == 'two'"
		v-editable="blok"
	)
		v-subheader(v-if="blok.subheader")
		v-list-item-group(:color="blok.color")
			component(
				v-for="blok in blok.content"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
</template>

<script>
	import { VList, VSubheader, VListItemGroup } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VList, VSubheader, VListItemGroup },
		computed: {
			addedStyles() {
				switch (this.blok.style) {
					case "arrow":
						return "arrow";
					case "sci-fi":
						return "sci-fi";
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.v-list {
		&.arrow .v-list-item {
			clip-path: polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%);
			margin-right: 15px;
		}
		&.sci-fi .v-list-item {
			clip-path: polygon(
				0% 0%,
				100% 0,
				100% calc(100% - 12px),
				calc(100% - 12px) 100%,
				0% 100%
			);
			margin-right: 15px;
		}
	}
</style>