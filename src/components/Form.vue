<template lang="pug">
	v-form(
		netlify
		:name="blok.form_name"
		method="POST"
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
	import { VForm } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VForm }
	};
</script>