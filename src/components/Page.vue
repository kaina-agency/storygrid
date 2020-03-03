<template lang="pug">
	div
		component(
			:key="blok._uid"
			v-for="blok in blok.body"
			:blok="blok"
			:is="blok.component"
		)
		div(v-html="blok.inject_html")
		component(:is="'style'")
			| {{ blok.inject_css }}
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>
