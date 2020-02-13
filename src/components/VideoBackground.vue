<template lang="pug">
	.video-container(
		:class="blok.class" 
		:style="blok.style" 
		v-editable="blok"
	)
		video(
			autoplay
			muted
			loop
			playsinline
			:style="`object-position: ${blok.horizontal_alignment} ${blok.vertical_alignment};`"
		)
			source(v-if="blok.webm" :src="blok.webm" type="video/webm")
			source(v-if="blok.mp4" :src="blok.mp4" type="video/mp4")
		.video-overlay(:style="overlay")
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			overlay() {
				return this.blok.overlay
					? `background: black; opacity: ${this.blok.overlay}`
					: 0;
			}
		}
	};
</script>

<style lang="scss">
	.video {
		&-container,
		&-overlay {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			overflow: hidden;
		}
	}

	video {
		min-height: 100%;
		max-height: 100%;
		min-width: 100%;
		max-width: 100%;
		object-fit: cover;
	}
</style>

