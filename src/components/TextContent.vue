<template lang="pug">
.rich-text(
	:id="'blok-' + blok._uid",
	v-html="richtext",
	v-intersect.once="annotate",
	:class="blok.class",
	:style="blok.style",
	v-editable="blok"
)
</template>

<script>
	import { annotate, annotationGroup } from "rough-notation";

	export default {
		props: ["blok"],
		data: () => ({ annotationsDrawn: false }),
		computed: {
			richtext() {
				if (this.blok.html) {
					return this.blok.html;
				} else {
					return this.$storyapi.richTextResolver.render(this.blok.rich_text);
				}
			},
		},
		methods: {
			annotate() {
				if (this.annotationsDrawn === false) {
					this.annotationsDrawn = true;
					let id = "blok-" + this.blok._uid;
					let annotations = [];
					document.querySelectorAll(`#${id} .annotation`).forEach((el) => {
						let type = el.classList[0];
						let color = this.blok.annotation_color || "var(--v-accent-base)";
						let multiline = true;
						if (type === "highlight") {
							color = "yellow";
						}
						if (type === "bracket") {
							multiline = false;
						}
						annotations.push(
							annotate(el, {
								type: type,
								color: color,
								multiline: multiline,
								iterations: 1,
								brackets: ["left", "right"],
							})
						);
					});
					annotationGroup(annotations).show();
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