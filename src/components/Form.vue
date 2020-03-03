<template lang="pug">
	v-form(
		:name="blok.form_name"
		:action="blok.action"
		:method="'POST'"
		enctype="multipart/form-data"
		ref="form"
		v-model="valid"
		v-editable="blok"
	)
		component(
			v-for="blok in blok.content"
			:key="blok._uid"
			:blok="blok"
			:is="blok.component"
		)
		v-row(no-gutters)
			Button(
				:disabled="!valid"
				type="submit"
				:blok="blok.submit_button[0]"
			)
			v-spacer
			v-btn(text color="error" @click="reset") reset form
</template>

<script>
	import Vue from "vue";
	import { VForm, VRow, VBtn, VSpacer } from "vuetify/lib";
	import { Button } from "./Button";

	export default {
		props: ["blok"],
		components: { VForm, VRow, VBtn, VSpacer },
		data: () => ({ valid: false }),
		methods: {
			reset() {
				this.$refs.form.reset();
			}
		}
	};
</script>