<template lang="pug">
.product-list(v-editable="blok")
	v-toolbar(dense, flat)
		v-toolbar-title {{ products.length }} product{{ products.length > 1 ? 's' : '' }}
		v-spacer
		v-select.flex-grow-0(
			:items="sortOptions",
			v-model="sort",
			color="accent",
			item-color="accent",
			hide-details,
			style="max-width: 175px;"
		)
	v-row
		v-col(
			cols,
			sm="6",
			md="4",
			lg="3",
			v-for="(product, i) in sorted",
			:key="product.node.content.name"
		)
			ProductCard(:product="product", :ratio="blok.image_aspect_ratio")
</template>

<script>
	import ProductCard from "./ProductCard.vue";
	export default {
		props: ["blok"],
		components: { ProductCard },
		data: () => ({
			products: {},
			sortOptions: [
				"Newest First",
				"Oldest First",
				"Price: Low to High",
				"Price: High to Low",
				"A-Z",
			],
			sort: "Newest First",
		}),
		created() {
			this.sort = this.blok.default_sort_order;
			let path = this.blok.products.cached_url;
			if (path) {
				let products = this.$static.allStoryblokEntry.edges.filter((entry) =>
					entry.node.full_slug.includes(path)
				);
				this.products = products.filter(
					(product) => product.node.full_slug != this.blok.products.cached_url
				);
			} else {
				this.products = undefined;
			}
		},
		computed: {
			sorted() {
				if (this.sort === "A-Z") {
					return this.products.sort((a, b) =>
						a.node.content.name > b.node.content.name ? 1 : -1
					);
				} else if (this.sort === "Newest First") {
					return this.products.sort((a, b) =>
						a.node.first_published_at < b.node.first_published_at ? 1 : -1
					);
				} else if (this.sort === "Oldest First") {
					return this.products.sort((a, b) =>
						a.node.first_published_at > b.node.first_published_at ? 1 : -1
					);
				} else if (this.sort === "Price: Low to High") {
					return this.products.sort((a, b) =>
						(a.node.content.sale_price || a.node.content.price) >
						(b.node.content.sale_price || b.node.content.price)
							? 1
							: -1
					);
				} else if (this.sort === "Price: High to Low") {
					return this.products.sort((a, b) =>
						(a.node.content.sale_price || a.node.content.price) <
						(b.node.content.sale_price || b.node.content.price)
							? 1
							: -1
					);
				}
			},
		},
	};
</script>

<style lang="scss">
	.product-list {
		.v-toolbar__content {
			padding: 0;
		}
	}
</style>

<static-query>
query {
	allStoryblokEntry {
		edges {
			node {
				full_slug
				content
				first_published_at
			}
		}
	}
}
</static-query>