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
			v-btn(
				:disabled="!valid"
				type="submit"
				:color="blok.submit_button[0].color"
				:depressed="blok.submit_button[0].style.includes('depressed')"
				:fab="blok.submit_button[0].style.includes('fab')"
				:icon="blok.submit_button[0].style.includes('icon')"
				:outlined="blok.submit_button[0].style.includes('outlined')"
				ripple
				:rounded="blok.submit_button[0].style.includes('rounded')"
				:text="blok.submit_button[0].style.includes('text')"
				:tile="blok.submit_button[0].style.includes('tile')"
				:x-small="blok.submit_button[0].size == 'xs'"
				:small="blok.submit_button[0].size == 'sm'"
				:medium="blok.submit_button[0].size == 'md'"
				:large="blok.submit_button[0].size == 'lg'"
				:x-large="blok.submit_button[0].size == 'xl'"
			)
				v-icon(left) {{'mdi-' + blok.submit_button[0].icon}}
				| {{blok.submit_button[0].text}}
			v-spacer
			v-btn(text color="error" @click="reset") reset form
</template>

<script>
	import { VForm, VRow, VBtn, VSpacer } from "vuetify/lib";
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