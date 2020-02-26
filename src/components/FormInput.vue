<template lang="pug">
	div
		v-text-field(
			v-if="blok.type=='text'"
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			hide-details
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			:prepend-inner-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			v-editable="blok"
		)
		v-text-field(
			v-if="blok.type=='phone'"
			v-mask="'(###) ###-####'"
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			hide-details
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			:prepend-inner-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			v-editable="blok"
		)
		v-text-field(
			v-if="blok.type=='email'"
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			hide-details
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			:prepend-inner-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			v-editable="blok"
		)
		v-select(
			v-if="blok.type=='select'"
			clearable
			:color="blok.color"
			:deletable-chips="blok.options.includes('multiple')"
			:dense="blok.options.includes('dense')"
			hide-details
			:item-color="blok.color"
			:items="blok.values.split('\\n')"
			:label="blok.label"
			:multiple="blok.options.includes('multiple')"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			:prepend-inner-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			:small-chips="blok.options.includes('multiple')"
			v-editable="blok"
		)
		v-textarea(
			v-if="blok.type=='textarea'"
			auto-grow
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			hide-details
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			no-resize
			:prepend-inner-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			v-editable="blok"
		)
		div(v-if="blok.type=='checkbox'" v-editable="blok")
			p {{blok.label}}
			v-checkbox(
				v-for="value in blok.values.split('\\n')"
				:key="value"
				v-model="multiple"
				:color="blok.color"
				hide-details
				:label="value"
				:name="value"
				:value="value"
			)
		div(v-if="blok.type=='switch'" v-editable="blok")
			p {{blok.label}}
			v-switch(
				v-for="value in blok.values.split('\\n')"
				:key="value"
				v-model="multiple"
				:color="blok.color"
				hide-details
				:label="value"
				:name="value"
				:value="value"
			)
		div(v-if="blok.type=='radio'" v-editable="blok")
			p {{blok.label}}
			v-radio-group(v-model="single")
				v-radio(
					v-for="value in blok.values.split('\\n')"
					:key="value"
					:color="blok.color"
					hide-details
					:label="value"
					:name="value"
					:value="value"
				)
</template>

<script>
	import {
		VTextField,
		VTextarea,
		VSelect,
		VCheckbox,
		VRadio,
		VRadioGroup,
		VSwitch
	} from "vuetify/lib";
	import { mask } from "vue-the-mask";
	export default {
		props: ["blok"],
		components: {
			VTextField,
			VTextarea,
			VSelect,
			VCheckbox,
			VRadio,
			VRadioGroup,
			VSwitch
		},
		directives: { mask },
		data: () => ({ multiple: [], single: "" })
	};
</script>

<style>
	.v-application--is-ltr .v-text-field .v-input__prepend-inner {
		padding-right: 8px;
	}
</style>