<template lang="pug">
	.simple-grid(v-editable="blok")
		v-card(
			v-for="(post, n) in posts"
			:key="n"
			:to="post.node.full_slug"
			:outlined="blok.options.includes('flat')"
			:flat="blok.options.includes('flat')"
		)
			v-img(
				:src="image(post.node.content.post_image)"
				aspect-ratio="1.777"
			)
				.overlay-image(
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
					return posts
						.filter(post => post.node.full_slug != this.blok.path.cached_url)
						.reverse();
				} else {
					return undefined;
				}
			},
			divider() {
				this.blok.options.includes("overlay image") ? false : true;
			}
		},
		methods: {
			image(img) {
				let asset = img.filename.replace("https://a.storyblok.com", "");
				return (
					"https://img2.storyblok.com/800x450/smart/filters:format(jpg)" + asset
				);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.overlay-image {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;

		.text-truncate {
			max-width: 80%;
		}
	}
</style>

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