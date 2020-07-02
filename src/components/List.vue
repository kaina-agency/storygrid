<template lang="pug">
	v-list(
		:class="[addedStyles, blok.class]"
		:flat="blok.flat"
		:nav="blok.shape == 'nav'"
		:rounded="blok.shape == 'rounded'"
		:shaped="blok.shape == 'shaped'"
		:three-line="blok.line_cap == 'three'"
		:two-line="blok.line_cap == 'two'"
		v-editable="blok"
	)
		v-subheader(v-if="blok.subheader")
		v-list-item-group(:color="blok.color")
			component(
				v-for="blok in blok.content"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
				:activeClass="activeClass"
			)
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			addedStyles() {
				switch (this.blok.shape) {
					case "arrow":
						return "arrow";
					case "sci-fi":
						return "sci-fi";
					case "sci-fi-narrow":
						return "sci-fi-narrow";
				}
			},
			activeClass() {
				return this.blok.active_class;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.v-list {
		&.arrow .v-list-item {
			clip-path: polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%);
			margin-right: 16px;
		}
		&.sci-fi .v-list-item {
			clip-path: polygon(
				0% 0%,
				100% 0,
				100% calc(100% - 12px),
				calc(100% - 12px) 100%,
				0% 100%
			);
			margin-right: 16px;
		}
		&.sci-fi-narrow .v-list-item {
			clip-path: polygon(
				100% 0,
				100% calc(100% - 12px),
				calc(100% - 12px) 100%,
				0% 100%,
				0 12px,
				12px 0
			);
			margin: 0 16px;
		}
	}

	.theme--light.v-list {
		background: transparent;
	}
</style>