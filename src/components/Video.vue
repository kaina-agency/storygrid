<template lang="pug">
.embed-container(v-editable="blok")
	iframe(
		v-if="blok.video_url",
		:src="videoURL",
		frameborder="0",
		loading="lazy",
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
		allowfullscreen
	)
	iframe(
		v-else,
		src="https://www.youtube.com/embed/NpEaa2P7qZI",
		frameborder="0"
	)
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			videoURL() {
				var input = this.blok.video_url;
				{
					var baseURL = "";
					var videoID = "";
					if (input.includes("youtu")) {
						baseURL = "https://www.youtube.com/embed/";
						if (input.includes("youtube")) {
							videoID = input.split("?v=")[1];
						} else if (input.includes("youtu.be")) {
							videoID = input.split(".be/")[1];
						}
					} else if (input.includes("vimeo")) {
						baseURL = "https://player.vimeo.com/video/";
						videoID = input.split("vimeo.com/")[1];
					}
					let autoplay = `?autoplay=${this.blok.auto_play ? "1" : "0"}`;
					let mute = `&mute=${this.blok.mute ? "1" : "0"}`;
					return baseURL + videoID + autoplay + mute + "&rel=0";
				}
			},
		},
	};
</script>

<style lang="scss">
	.embed-container {
		position: relative;
		padding-bottom: 56.2%;
		height: 0;
		overflow: hidden;
		max-width: 100%;

		iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	.in-editor .embed-container iframe {
		pointer-events: none;
	}
</style>
