<template lang="pug">
	div(v-html="richtext")
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			richtext() {
				return !this.blok.html && this.blok.rich_text
					? this.$storyapi.richTextResolver.render(this.blok.rich_text)
					: this.blok.html;
			}
		}
	};
</script>