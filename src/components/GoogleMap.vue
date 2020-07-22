<template lang="pug">
div(v-editable="blok")
	iframe(
		:width="blok.width",
		:height="blok.height",
		:src="url",
		frameborder="0",
		scrolling="no",
		:class="[blok.class, 'google-map']",
		:style="'display: block;' + blok.style"
	)
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			url() {
				return (
					"https://maps.google.com/maps?q=" +
					JSON.stringify(this.blok.location) +
					this.blok.satellite +
					"&z=" +
					this.blok.zoom_level +
					"&ie=UTF8&output=embed"
				);
			},
		},
	};
</script>

<style>
	.in-editor .google-map {
		pointer-events: none;
	}
</style>