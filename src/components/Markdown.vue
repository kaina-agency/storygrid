<template lang="pug">
	markdown-it-vue(
		:class="blok.class"
		:content="blok.markdown"
		:options="options"
		:style="blok.style"
		v-editable="blok"
	)
</template>

<script>
	import MarkdownItVue from "markdown-it-vue";
	import "markdown-it-vue/dist/markdown-it-vue.css";

	export default {
		props: ["blok"],
		components: {
			MarkdownItVue
		},
		data: () => ({
			options: {
				markdownIt: {
					breaks: true,
					linkify: true,
					html: true,
					xthmlOut: true
				},
				linkAttributes: {
					attrs: {
						rel: "noopener"
					}
				}
			}
		})
	};
</script>