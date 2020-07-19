<template lang="pug">
	v-menu(
		:absolute="blok.absolute"
		close-on-click
		close-on-content-click
		offset-y
	)
		template(v-slot:activator='{ on, attrs }')
			div(v-bind='attrs' v-on='on' v-editable="blok" :class="blok.class")
				component(
					v-for='blok in blok.activator'
					:key='blok._uid'
					:blok='blok'
					:is='blok.component'
				)
		component(
			v-for='blok in blok.content'
			:key='blok._uid'
			:blok='blok'
			:is='blok.component'
		)
</template>

<script>
	import { Button } from "./Button";
	export default {
		props: ["blok"],

		data: () => ({
			items: [
				{ title: "Click Me1" },
				{ title: "Click Me2" },
				{ title: "Click Me3" },
				{ title: "Click Me4" }
			]
		})
	};
</script>