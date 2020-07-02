<template lang="pug">
	.rich-text(
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

<style lang="scss">
	.rich-text {
		position: relative;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	.v-card__text,
	.v-expansion-panel-content__wrap {
		.rich-text {
			*:first-child {
				margin-top: 0;
			}
			*:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>