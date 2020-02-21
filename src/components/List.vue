<template lang="pug">
	v-list(
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
		components: { VList, VSubheader, VListItemGroup }
	};
</script>