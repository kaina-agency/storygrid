<template lang="pug">
v-container.mb-12
	.hidden-md-and-up
		h1.h2 {{ blok.name }}
		b.h4.green--text.darken-1 ${{ price }}
	v-row
		v-col(cols, md="6")
			v-carousel(v-if="blok.images.length > 1", height="auto")
				v-carousel-item(
					v-for="(img, i) in blok.images",
					:key="i",
					:src="image(img)"
				)
			v-img(v-else, :src="image(blok.images[0])")
		v-col(cols, md="6")
			.hidden-sm-and-down
				h1.h2.mt-0 {{ blok.name }}
				b.h4.green--text.darken-1.d-block.mb-4 ${{ price }}
			.rich-text.mb-6(
				v-html="$storyapi.richTextResolver.render(blok.description)"
			)
			div(v-for="i in 3", :key="i")
				v-select(
					v-if="blok[`option_${i}_type`] === 'dropdown' && blok[`option_${i}_label`]",
					outlined,
					:label="blok[`option_${i}_label`]",
					:items="blok[`option_${i}_value`].split('\\n')",
					color="accent",
					item-color="accent",
					v-model="$data[`option${i}`]"
				)
				v-text-field(
					v-if="blok[`option_${i}_type`] === 'text' && blok[`option_${i}_label`]",
					outlined,
					:label="blok[`option_${i}_label`]",
					:placeholder="blok[`option_${i}_value`]",
					color="accent",
					v-model="$data[`option${i}`]"
				)
				v-textarea(
					v-if="blok[`option_${i}_type`] === 'textarea' && blok[`option_${i}_label`]",
					outlined,
					:label="blok[`option_${i}_label`]",
					:placeholder="blok[`option_${i}_value`]",
					color="accent",
					v-model="$data[`option${i}`]"
				)
				v-checkbox.mt-0(
					v-if="blok[`option_${i}_type`] === 'checkbox' && blok[`option_${i}_label`]",
					:label="blok[`option_${i}_label`]",
					color="accent",
					v-model="$data[`option${i}`]"
				)
			v-btn.snipcart-add-item.green.darken-1(
				dark,
				:data-item-id="blok.name",
				:data-item-price="price",
				:data-item-url="$route.path",
				:data-item-image="image(blok.images[0])",
				:data-item-name="blok.name",
				:data-item-custom1-name="blok.option_1_label || undefined",
				:data-item-custom1-options="blok.option_1_type === 'dropdown' ? blok.option_1_value.replace(/\\n/gi, '|') : undefined",
				:data-item-custom1-value="option1 || undefined",
				:data-item-custom1-type="['checkbox', 'textarea'].includes(blok.option_1_type) ? blok.option_1_type : undefined",
				:data-item-custom2-name="blok.option_2_label || undefined",
				:data-item-custom2-options="blok.option_2_type === 'dropdown' ? blok.option_2_value.replace(/\\n/gi, '|') : undefined",
				:data-item-custom2-value="option2 || undefined",
				:data-item-custom2-type="['checkbox', 'textarea'].includes(blok.option_2_type) ? blok.option_2_type : undefined",
				:data-item-custom3-name="blok.option_3_label || undefined",
				:data-item-custom3-options="blok.option_3_type === 'dropdown' ? blok.option_3_value.replace(/\\n/gi, '|') : undefined",
				:data-item-custom3-value="option3 || undefined",
				:data-item-custom3-type="['checkbox', 'textarea'].includes(blok.option_3_type) ? blok.option_3_type : undefined"
			) Add to Cart
</template>

<script>
	export default {
		props: ["blok"],
		data: () => ({ option1: "", option2: "", option3: "" }),
		methods: {
			image(img) {
				let asset = img.filename.replace("https://a.storyblok.com", "");
				return "https://img2.storyblok.com/800x/smart/" + asset;
			},
		},
		computed: {
			price() {
				return Number(this.blok.price).toFixed(2);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		@media (min-width: 1024px) {
			padding: 24px;
			max-width: 1440px;
		}
	}
</style>
