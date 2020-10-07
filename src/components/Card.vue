<template lang="pug">
v-card(
	:color="color",
	:dark="blok.options.includes('dark')",
	:flat="blok.options.includes('flat')",
	:hover="blok.options.includes('hover')",
	:href="href",
	:outlined="blok.options.includes('outlined')",
	:raised="blok.options.includes('raised')",
	:shaped="blok.options.includes('shaped')",
	:tile="blok.options.includes('tile')",
	:to="to",
	:class="blok.class",
	:style="blok.style",
	v-editable="blok"
)
	component(
		v-for="blok in blok.media",
		:key="blok._uid",
		:blok="blok",
		:is="blok.component"
	)
	v-divider(
		v-if="blok.media && blok.content && blok.options.includes('separators')"
	)
	v-card-text(v-if="(blok.content || {}).length")
		component(
			v-for="blok in blok.content",
			:key="blok._uid",
			:blok="blok",
			:is="blok.component"
		)
	v-divider(
		v-if="blok.content && blok.actions && blok.options.includes('separators')"
	)
	v-card-actions(v-if="(blok.actions || {}).length")
		component(
			v-for="blok in blok.actions",
			:key="blok._uid",
			:blok="blok",
			:is="blok.component"
		)
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			color() {
				return this.blok.color ? this.blok.color : null;
			},
			href() {
				const l = this.blok.link;
				switch (l.linktype) {
					case "story":
						return "";
						break;
					case "url":
						return l.url;
						break;
					case "email":
						return "mailto:" + l.email;
						break;
					case "asset":
						return l.url;
						break;
				}
			},
			to() {
				const l = this.blok.link;
				let path = l.cached_url;
				if (l.linktype == "story") {
					switch (path) {
						case "home":
							return "/";
							break;
						case "":
							return undefined;
						default:
							return "/" + path;
					}
				}
			},
		},
	};
</script>

<style lang="scss">
	.v-card {
		overflow: hidden;

		&:focus:before {
			opacity: 0;
		}

		&.v-card--shaped {
			border-radius: 24px 4px !important;
			overflow: hidden;
		}

		&__actions {
			.v-btn.v-btn--flat {
				padding: 0 8px !important;
			}
		}
	}

	.theme--light.v-card .v-card__subtitle,
	.theme--light.v-card > .v-card__text {
		color: black;
		opacity: 1;
	}

	.theme--dark.v-card .v-card__subtitle *,
	.theme--dark.v-card > .v-card__text *,
	.theme--light.v-card .v-card__subtitle .theme--dark *,
	.theme--light.v-card > .v-card__text .theme--dark * {
		color: white;
		opacity: 1;
	}
</style>