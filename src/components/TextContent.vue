<template lang="pug">
.rich-text(
	v-html="richtext",
	:class="blok.class",
	:style="blok.style",
	v-editable="blok"
)
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			richtext() {
				if (this.blok.html) {
					return this.blok.html;
				} else {
					return this.$storyapi.richTextResolver.render(this.blok.rich_text);
				}
			},
		},
	};
</script>

<style lang="scss">
	.rich-text {
		position: relative;

		img {
			max-width: 100%;
			height: auto;
		}

		.caption {
			display: block;
			position: relative;
			top: -1rem;
			margin-bottom: -1rem;
		}
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