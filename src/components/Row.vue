<template lang="pug">
	v-row(
		:dense="blok.gutters == 'dense'"
		:no-gutters="blok.gutters == 'no-gutters'"
		:class="[blok.class, blok.alignment]"
		:style="blok.style"
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
	import { VRow } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VRow }
	};
</script>