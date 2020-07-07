<template lang="pug">
	.g-crumbs(
		:class="blok.class"
		:color="blok.color"
		v-editable="blok"
	)
		g-link(
			v-for="(item, i) in items"
			:key="i"
			:to="item.to"
			class="g-crumb"
			:style="`color: ${blok.color}`"
		)
			| {{item.text}}
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			items() {
				let crumbs = [
					{
						text: "home",
						to: "/"
					}
				];

				let path = this.$route.path;
				let pathArray = path.split("/");
				let limit = this.blok.number || 2;

				for (var i = 0; i < pathArray.length && i < limit; i++) {
					let slug = pathArray[i];
					if (slug) {
						crumbs.push({
							text: slug.replace("-", " "),
							to: path.split(slug)[0] + slug
						});
					}
				}

				return crumbs;
			}
		}
	};
</script>

<style>
	.g-crumbs {
		text-transform: uppercase;
		font-size: 14px;
	}
	.g-crumb {
		text-decoration: none;
	}
	.g-crumb:hover {
		text-decoration: underline;
	}
	.g-crumb + .g-crumb:before {
		content: "/";
		margin: 0 0.5em;
		display: inline-block;
		text-decoration: none;
	}
	.g-crumb:last-of-type {
		pointer-events: none;
	}
</style>