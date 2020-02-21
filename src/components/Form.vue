<template lang="pug">
	v-form(
		netlify
		:name="blok.form_name"
		method="POST"
		v-editable="blok"
	)
</template>

<script>
	import { VForm, VTextField, VBtn } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VForm, VTextField, VBtn }
	};
</script>