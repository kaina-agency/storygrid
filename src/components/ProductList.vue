<template lang="pug">
v-row
	v-col(
		cols,
		sm="6",
		md="4",
		lg="3",
		v-for="(product, i) in products",
		:key="i"
	)
		ProductCard(:product="product")
</template>

<script>
	import ProductCard from "./ProductCard.vue";
	export default {
		props: ["blok"],
		components: { ProductCard },
		computed: {
			products() {
				let path = this.blok.products.cached_url;
				if (path) {
					let posts = this.$static.allStoryblokEntry.edges.filter((entry) =>
						entry.node.full_slug.includes(path)
					);
					return posts
						.filter(
							(post) => post.node.full_slug != this.blok.products.cached_url
						)
						.reverse();
				} else {
					return undefined;
				}
			},
		},
		methods: {
			image(img) {
				let asset = img.filename.replace("https://a.storyblok.com", "");
				return "https://img2.storyblok.com/800x600/smart/" + asset;
			},
		},
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