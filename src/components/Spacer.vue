<template lang="pug">
	v-spacer(v-editable="blok")
		p.dot-leader(v-if="blok.dot_leader") ⠀
</template>

<script>
	import { VSpacer } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VSpacer }
	};
</script>

<style>
	.dot-leader {
		width: calc(100% - 0.5em);
		line-height: 1;
		margin: 0 0.25em;
	}

	.theme--light.v-application .dot-leader {
		border-bottom: 2px dotted rgba(0, 0, 0, 0.87);
	}

	.theme--dark.v-application .dot-leader {
		border-bottom: 2px dotted white;
	}
</style>