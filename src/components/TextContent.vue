<template lang="pug">
div
	.rich-text(
		:id="'blok-' + blok._uid",
		v-html="richtext",
		v-intersect.once="{handler: annotate, options: {threshold: [0.33]}}",
		:class="[blok.class, lineClamp ? 'line-clamp' : '']",
		:style="[blok.style, { webkitLineClamp: lineClamp }]",
		v-editable="blok"
	)
	v-btn.mt-4(
		v-if="lineClamp",
		color="accent",
		outlined,
		small,
		@click="lineClamp = undefined"
	) Read More
</template>

<script>
	import { annotate, annotationGroup } from "rough-notation";

	export default {
		props: ["blok"],
		data: () => ({
			lineClamp: undefined,
		}),
		created() {
			this.lineClamp = this.blok.line_clamp;
		},
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
			annotate(entries) {
				if (entries[0].isIntersecting) {
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
		mounted() {
			if (this.blok.html.includes("<script")) {
				let scriptTags = this.$el.querySelectorAll(`script`);
				scriptTags.forEach((tag) => {
					let newTag = document.createElement("script");
					newTag.type = "module";
					newTag.src = tag.src;
					newTag.innerHTML = tag.innerHTML;
					tag.remove();
					document.head.appendChild(newTag);
					eval(tag.innerText);
				});
			}
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

		&.line-clamp {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
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