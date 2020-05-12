<template lang="pug">
	v-row(v-editable="blok" :dense="blok.options.includes('dense')")
		v-col(
			v-for="(post, n) in posts"
			:key="n"
			:cols="responsive.xs"
			:sm="responsive.sm"
			:md="responsive.md"
			:lg="responsive.lg"
			:xl="responsive.xl"
		)
			v-card(
				:href="post.node.full_slug"
				:shaped="blok.options.includes('shaped')"
				:outlined="blok.options.includes('outlined')"
				:flat="blok.options.includes('outlined')"
			)
				v-img(
					v-if="!blok.options.includes('hide images')"
					:src="post.node.content.post_image"
					aspect-ratio="1.777"
				)
					.d-flex.flex-column.justify-center.align-center.white--text(
						v-if="blok.options.includes('overlay image')"
						style="height: 100%; width: 100%; background: rgba(0,0,0,0.5);"
					)
						div.text-truncate
							b {{post.node.content.meta.title}}
						div.text-truncate {{post.node.content.meta.description}}
				v-divider(v-if="divider")
				v-card-text(v-if="!blok.options.includes('overlay image')")
					div.text-truncate
						b {{post.node.content.meta.title}}
					div.text-truncate {{post.node.content.meta.description}}
</template>

<script>
	import { VImg, VAvatar } from "vuetify/lib";

	export default {
		props: ["blok"],
		components: { VImg, VAvatar },
		computed: {
			posts() {
				return this.$static.allStoryblokEntry.edges.filter(entry =>
					entry.node.full_slug.includes("posts")
				);
			},
			responsive() {
				let r = this.blok.responsive;
				return {
					xs: r.xsmall,
					sm: r.small || r.xsmall,
					md: r.medium || r.small || r.xsmall,
					lg: r.large || r.medium || r.small || r.xsmall,
					xl: r.xlarge || r.large || r.medium || r.small || r.xsmall
				};
			},
			divider() {
				if (this.blok.options.includes("overlay image")) {
					return false;
				} else if (this.blok.options.includes("hide images")) {
					return false;
				} else {
					return true;
				}
			}
		}
	};
</script>

<static-query>
query {
	allStoryblokEntry {
		edges {
			node {
				id
				full_slug
				content
			}
		}
	}
}
</static-query>