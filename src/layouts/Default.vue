<template lang="pug">
	v-app(:style="appStyles")
		v-app-bar(app dense color="primary" dark :flat="settings.flat_header")
			v-app-bar-nav-icon(@click="drawer = !drawer")
			component(
				v-for="blok in settings.header"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-navigation-drawer(
			app
			v-if="(settings.drawer || {}).length || false"
			v-model="drawer")
			component(
				v-for="blok in settings.drawer"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-content(app)
			slot
</template>

<script>
	import config from "../../gridsome.config";

	export default {
		data: () => ({
			settings: {},
			drawer: null
		}),
		async mounted() {
			try {
				const results = await this.$fetch("/settings");
				this.settings = results.data.storyblokEntry.content;
			} catch (error) {
				console.log(error);
			}
		},
		computed: {
			appStyles() {
				let s = this.settings;
				let styles = {
					"--heading-font": s.heading_font,
					"--body-font": s.body_font
				};
				let responsive =
					"calc(minpx + (max - min) * ((100vw - 400px) / (1800 - 400)))";
				for (let i = 1; i <= 6; i++) {
					styles["--h" + i + "-fs"] = responsive
						.replace(/min/g, s["h" + i + "_min"])
						.replace(/max/g, s["h" + i + "_max"]);
				}
				return styles;
			}
		}
	};
</script>

<style lang="scss">
	body {
		font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
		margin: 0;
		padding: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--heading-font), Roboto, "Helvetica Neue", Arial, sans-serif;
		line-height: 1;
		padding: 1rem 0;
	}

	h1 {
		font-size: 60;
		font-size: var(--h1-fs, 60);
	}

	h2 {
		font-size: 48;
		font-size: var(--h2-fs, 48);
	}

	h3 {
		font-size: 34;
		font-size: var(--h3-fs, 34);
	}

	h4 {
		font-size: 24;
		font-size: var(--h4-fs, 24);
	}

	h5 {
		font-size: 20;
		font-size: var(--h5-fs, 20);
	}

	h6 {
		font-size: 18;
		font-size: var(--h6-fs, 18);
	}
</style>