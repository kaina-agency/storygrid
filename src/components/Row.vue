<template lang="pug">
	v-row(
		:dense="blok.gutters == 'dense'"
		:no-gutters="blok.gutters == 'no-gutters'"
		:class="[blok.class, blok.alignment, blok.match_card_height ? 'match-cards' : '']"
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
	export default {
		props: ["blok"]
	};
</script>

<style lang="scss">
	.match-cards {
		.v-card {
			height: 100%;
		}
	}
</style>