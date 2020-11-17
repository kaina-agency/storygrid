<template>
	<v-sparkline
		v-editable="blok"
		:color="blok.label_color"
		:fill="blok.filled"
		:gradient="[blok.gradient_start, blok.gradient_end]"
		:height="blok.height"
		:line-width="blok.width"
		:padding="blok.padding"
		:radius="blok.radius"
		:smooth="blok.radius || false"
		:stroke-linecap="lineCap"
		:type="blok.type"
		:value="value"
		auto-draw
		auto-line-width
		:gradient-direction="blok.gradient_direction"
	>
		<template v-slot:label="item">
			{{ blok.label_prefix }}{{ item.value }}{{ blok.label_suffix }}
		</template>
	</v-sparkline>
</template>

<script>
	export default {
		props: ["blok"],
		data: () => ({
			lineCap: "round",
		}),
		computed: {
			value() {
				let vals = this.blok.value.split(",");
				let numeric = [];
				vals.forEach((val) => {
					numeric.push(Number(val));
				});
				return numeric;
			},
		},
	};
</script>