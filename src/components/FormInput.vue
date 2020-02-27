<template lang="pug">
	div
		v-text-field(
			v-if="blok.type=='text'"
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			:prepend-icon="'mdi-' + blok.icon"
			:rounded="blok.options.includes('rounded')"
			v-editable="blok"
			:rules="blok.options.includes('required') ? [v => !!v || blok.label + ' is required'] : []"
		)
		v-text-field(
			v-if="blok.type=='phone'"
			v-mask="'(###) ###-####'"
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			:prepend-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			type="tel"
			v-editable="blok"
	 		:rules="blok.options.includes('required') ? phoneRules : []"
		)
		v-text-field(
			v-if="blok.type=='email'"
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			:prepend-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			type="email"
			v-editable="blok"
	 		:rules="blok.options.includes('required') ? emailRules : []"
		)
		v-select(
			v-if="blok.type=='select'"
			clearable
			:color="blok.color"
			:deletable-chips="blok.options.includes('multiple')"
			:dense="blok.options.includes('dense')"
			:item-color="blok.color"
			:items="blok.values.split('\\n')"
			:label="blok.label"
			:multiple="blok.options.includes('multiple')"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			:prepend-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			:small-chips="blok.options.includes('multiple')"
			v-editable="blok"
			:rules="blok.options.includes('required') ? [v => !!v || blok.label + ' is required'] : []"
		)
		v-textarea(
			v-if="blok.type=='textarea'"
			auto-grow
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			:name="blok.label"
			no-resize
			:prepend-icon="'mdi-' + blok.icon"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			v-editable="blok"
			:rules="blok.options.includes('required') ? [v => !!v || blok.label + ' is required'] : []"
		)
		v-file-input(
			v-if="blok.type=='file'"
			:prepend-icon="undefined"
			clearable
			:color="blok.color"
			:dense="blok.options.includes('dense')"
			hint="There is a 25MB limit for file uploads."
			:label="blok.label"
			:outlined="blok.options.includes('outlined')"
			name="file"
			:required="blok.options.includes('required')"
			:rounded="blok.options.includes('rounded')"
			type="file"
			v-editable="blok"
			:rules="blok.options.includes('required') ? [v => !!v || 'You must select a file'] : []"
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
				:value="value"
				:rules="blok.options.includes('required') ? [v => !!v || blok.label + ' is required'] : []"
			)
			input(
				type="hidden"
				:name="blok.label"
				:value="multiple.join(', ')"
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
				:value="value"
				:rules="blok.options.includes('required') ? [v => !!v || blok.label + ' is required'] : []"
			)
			input(
				type="hidden"
				:name="blok.label"
				:value="multiple.join(', ')"
			)
		div(v-if="blok.type=='radio'" v-editable="blok")
			p {{blok.label}}
			v-radio-group(
				v-model="single"
				:name="blok.label"
				:rules="blok.options.includes('required') ? [v => !!v || blok.label + ' is required'] : []"
			)
				v-radio(
					v-for="value in blok.values.split('\\n')"
					:key="value"
					:color="blok.color"
					hide-details
					:label="value"
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
		VSwitch,
		VFileInput
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
			VSwitch,
			VFileInput
		},
		directives: { mask },
		data: () => ({
			multiple: [],
			single: "",
			emailRules: [
				v => !!v || "Email is required",
				v =>
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					) || "E-mail must be valid"
			],
			phoneRules: [
				v => !!v || "Phone number is required",
				v => (v && v.length === 14) || "Enter a valid phone number"
			]
		})
	};
</script>

<style>
	.v-application--is-ltr .v-text-field .v-input__prepend-inner {
		padding-right: 8px;
	}
</style>