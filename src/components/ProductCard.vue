<template lang="pug">
v-card(
	:data-item-id="props.name",
	:data-item-price="price.actual",
	:data-item-url="slug",
	:data-item-image="image(props.images[0])",
	:data-item-name="props.name",
	:to="'/' + slug"
)
	v-img(:src="image(props.images[0])")
	v-card-title.pb-0
		.text-truncate {{ props.name }}
	v-card-text.text-subtitle-1
		.d-flex.justify-space-between
			.green--text.darken-1 ${{ price.actual }}
			.green--text.darken-1(v-if="props.sale_price") {{ price.discount }}
</template>

<script>
	export default {
		name: "ProductCard",
		props: ["product", "ratio"],
		data: () => ({ props: {} }),
		created() {
			this.props = this.product.node.content;
			this.slug = this.product.node.full_slug;
		},
		methods: {
			image(img) {
				let asset = img.filename.replace("https://a.storyblok.com", "");
				return (
					`https://img2.storyblok.com/${this.ratio || "800x600"}/smart/` + asset
				);
			},
		},
		computed: {
			price() {
				let original = Number(this.props.price).toFixed(2);
				let sale = Number(this.props.sale_price).toFixed(2);
				return {
					actual: sale > 0 ? sale : original,
					original: original,
					sale: sale,
					discount:
						Math.round((sale / original) * 100) + "% off from $" + original,
				};
			},
		},
	};
</script>