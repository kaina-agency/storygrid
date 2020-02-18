<template lang="pug">
	div.rich-text(
		v-html="richtext"
		:class="blok.class"
		:style="blok.style"
		v-editable="blok"
	)
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

<style>
	.rich-text {
		position: relative;
	}
</style>