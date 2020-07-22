<template lang="pug">
v-text-field(
	outlined,
	rounded,
	color="accent",
	hint="Search results will open in Google",
	:label="blok.label",
	:prepend-inner-icon="google",
	v-model="searchTerms",
	@keydown.enter="search"
)
</template>

<script>
	import { mdiGoogle } from "@mdi/js";
	export default {
		props: ["blok"],
		data: () => ({ searchTerms: "", google: mdiGoogle }),
		methods: {
			search() {
				let location = window.location.host;
				window.open(
					`https://www.google.com/search?q=site:${location} ${this.searchTerms}`
				);
			},
		},
	};
</script>

