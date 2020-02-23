<template lang="pug">
	v-card(
		:dark="blok.options.includes('dark')"
		:flat="blok.options.includes('flat')"
		:hover="blok.options.includes('hover')"
		:href="href"
		:outlined="blok.options.includes('outlined')"
		:raised="blok.options.includes('raised')"
		:shaped="blok.options.includes('shaped')"
		:tile="blok.options.includes('tile')"
		:to="to"
		:class="blok.class"
		:style="blok.style"
		v-editable="blok"
	)
		component(
				v-for="blok in blok.media"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-divider(v-if="blok.media && blok.content && blok.options.includes('separators')")
		v-card-text(v-if="(blok.content || {}).length")
			component(
				v-for="blok in blok.content"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-divider(v-if="blok.content && blok.actions && blok.options.includes('separators')")
		v-card-actions(v-if="(blok.actions || {}).length")
			component(
				v-for="blok in blok.actions"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
</template>

<script>
	import { VCard, VCardText, VCardActions, VDivider } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VCard, VCardText, VCardActions, VDivider },
		computed: {
			href() {
				const b = this.blok;
				if (b.link.linktype == "story") {
					return "";
				} else if (b.link.linktype == "url") {
					return b.link.url;
				} else if (b.link.linktype == "email") {
					return "mailto:" + b.link.url;
				} else if (b.link.linktype == "asset") {
					return b.link.url;
				} else {
					return undefined;
				}
			},
			to() {
				let b = this.blok;
				let path = b.link.cached_url == "home" ? "" : b.link.cached_url;
				if (b.link.linktype == "story" && b.link.cached_url.length > 0) {
					return "/" + path;
				}
			}
		}
	};
</script>

<style lang="scss">
	.v-card {
		overflow: hidden;

		.rich-text {
			*:first-child {
				margin-top: 0;
			}
			*:last-child {
				margin-bottom: 0;
			}
		}
	}

	.theme--light.v-card .v-card__subtitle,
	.theme--light.v-card > .v-card__text {
		color: rgba(0, 0, 0, 0.9);
	}

	.theme--dark.v-card .v-card__subtitle,
	.theme--dark.v-card > .v-card__text {
		color: rgba(255, 255, 255, 0.9);
	}
</style>