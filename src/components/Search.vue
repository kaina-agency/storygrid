<template lang="pug">
div(:class="blok.class")
	v-text-field(
		v-editable="blok",
		v-model="query",
		@keydown.enter="search",
		:append-icon="icon",
		:label="blok.label",
		:style="`max-width: ${blok.max_width}`",
		color="accent",
		dense,
		flat,
		hide-details,
		outlined,
		rounded,
		single-line,
		solo
	)
	v-dialog(max-width="500px", v-model="showResults")
		v-card.search-results(v-if="results")
			v-card-text
				v-text-field.mb-4(
					v-editable="blok",
					v-model="query",
					@keydown.enter="search",
					:append-icon="icon",
					:label="blok.label",
					:style="`max-width: ${blok.max_width}`",
					color="accent",
					dense,
					flat,
					hide-details,
					outlined,
					rounded,
					single-line,
					solo
				)
				.result.mb-4(v-for="(result, n) in results.items", :key="n")
					.body-1.bold(v-html="result.title")
					.caption.snippet(v-html="result.snippet")
					a.caption(v-html="result.htmlFormattedUrl", :href="result.link")
				.body-1.text-center(v-if="numResults == 0")
					| {{ blok.no_results_message.replace('%q', query) }}
</template>

<script>
	import { mdiMagnify } from "@mdi/js";
	export default {
		props: ["blok"],
		data: () => ({
			query: "",
			results: {},
			numResults: 0,
			showResults: false,
			icon: mdiMagnify,
		}),
		methods: {
			async search() {
				let search = `https://www.googleapis.com/customsearch/v1/siterestrict?cx=${this.blok.custom_search_engine}&q=${this.query}&safe=off&key=${this.blok.search_api_key}`;

				await fetch(search)
					.then((response) => response.json())
					.then((data) => (this.results = data));

				this.numResults = this.results.searchInformation.totalResults;
				this.showResults = true;
			},
		},
	};
</script>

<style lang="scss">
	.search-results {
		.result {
			position: relative;
			.snippet {
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
			a:before {
				content: "";
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
			}
		}
	}
</style>