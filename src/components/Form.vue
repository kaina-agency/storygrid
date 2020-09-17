<template lang="pug">
v-form(
	:name="blok.form_name",
	:action="blok.action",
	:method="'POST'",
	enctype="multipart/form-data",
	ref="form",
	v-model="valid",
	v-editable="blok"
)
	div(v-if="blok.action.includes('formsubmit.co')")
		input(type="hidden" name="_template" value="box")
		input(type="text" name="_honey" style="display:none")
	component(
		v-for="blok in blok.content",
		:key="blok._uid",
		:blok="blok",
		:is="blok.component"
	)
	v-row(no-gutters)
		Button(:disabled="!valid", type="submit", :blok="blok.submit_button[0]")
		v-spacer
		v-btn(text, color="error", @click="reset") reset form
</template>

<script>
	import { Button } from "./Button";

	export default {
		props: ["blok"],
		data: () => ({ valid: false }),
		methods: {
			reset() {
				this.$refs.form.reset();
			},
		},
	};
</script>