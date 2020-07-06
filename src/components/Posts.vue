<template lang="pug">
	.simple-grid
		v-card(
			v-for="(post, n) in posts"
			:key="n"
			:to="post.node.full_slug"
			:outlined="blok.options.includes('flat')"
			:flat="blok.options.includes('flat')"
		)
			v-img(
				:src="post.node.content.post_image"
				aspect-ratio="1.777"
			)
				.d-flex.flex-column.justify-center.align-center.white--text(
					v-if="blok.options.includes('overlay image')"
					style="height: 100%; width: 100%; background: rgba(0,0,0,0.5);"
				)
					.text-truncate
						b(style="font-size: 1rem;") {{post.node.content.meta.title}}
					.text-truncate {{post.node.content.meta.description}}
			v-divider(v-if="divider")
			v-card-text(v-if="!blok.options.includes('overlay image')")
				.text-truncate
					b(style="font-size: 1rem;") {{post.node.content.meta.title}}
				.text-truncate {{post.node.content.meta.description}}
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			posts() {
				let path = this.blok.path.cached_url;
				if (path) {
					let posts = this.$static.allStoryblokEntry.edges.filter(entry =>
						entry.node.full_slug.includes(path)
					);
					return posts.filter(
						post => post.node.full_slug != this.blok.path.cached_url
					);
				} else {
					return undefined;
				}
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
				this.blok.options.includes("overlay image") ? false : true;
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