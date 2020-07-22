<template lang="pug">
v-spacer(v-editable="blok")
	p.dot-leader(
		v-if="blok.dot_leader",
		:class="blok.remove_margin ? 'no-margin' : ''"
	) ⠀
</template>

<script>
	export default {
		props: ["blok"],
	};
</script>

<style lang="scss">
	.dot-leader {
		width: calc(100% - 0.5em);
		line-height: 1;
		margin: 0 0.25em;

		&.no-margin {
			margin-bottom: 0;
		}
	}

	.theme--light.v-application .dot-leader {
		border-bottom: 2px dotted rgba(0, 0, 0, 0.87);
	}

	.theme--dark.v-application .dot-leader {
		border-bottom: 2px dotted white;
	}
</style>