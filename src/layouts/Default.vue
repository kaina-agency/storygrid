<template lang="pug">
	v-app(:style="appStyles")
		v-app-bar(
			app
			:clipped-left="settings.full_width_header || false"
			dense
			color="primary"
			dark
			:flat="settings.flat_header"
		)
			v-app-bar-nav-icon(@click="drawer = !drawer")
			component(
				v-for="blok in settings.header"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-navigation-drawer(
			app
			:clipped="settings.full_width_header || false"
			:class="settings.drawer_class || 'secondary'"
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
		async created() {
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

				styles["--bs"] = responsive
					.replace(/min/g, s.body_min)
					.replace(/max/g, s.body_max);

				let themeColors = [
					"primary",
					"secondary",
					"accent",
					"success",
					"error",
					"info",
					"warning"
				];

				if (s.theme == "dark") this.$vuetify.theme.dark = true;
				themeColors.forEach(color => {
					if (s[color]) {
						this.$vuetify.theme.themes.light[color] = s[color];
					}
					if (s[color + "_dark"]) {
						this.$vuetify.theme.themes.dark[color] = s[color + "_dark"];
					}
				});

				return styles;
			}
		},
		mounted() {
			if (window.location != window.parent.location) {
				console.info("Layout is in edit mode");
				const loadStory = () => {
					window.storyblok.get(
						{
							slug: "settings",
							version: "draft"
						},
						data => {
							this.settings = data.story.content;
							if (data.story.content == "dynamic") {
								if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
									this.$vuetify.theme.dark = true;
								}
							}
						}
					);
				};
				const initStoryblokEvents = () => {
					loadStory();

					let sb = window.storyblok;

					sb.on(["change", "published", "input"], payload => {
						loadStory();
					});

					sb.pingEditor(() => {
						if (sb.inEditor) {
							sb.enterEditmode();
						}
					});
				};
				const loadStoryblokBridge = cb => {
					let sbConfigs = config.plugins.filter(item => {
						return item.use === "gridsome-source-storyblok";
					});
					let sbConfig = sbConfigs.length > 0 ? sbConfigs[0] : {};
					let script = document.createElement("script");
					script.type = "text/javascript";
					script.src = `//app.storyblok.com/f/storyblok-latest.js?t=${sbConfig.options.client.accessToken}`;
					script.onload = cb;
					document.getElementsByTagName("head")[0].appendChild(script);
				};
				loadStoryblokBridge(() => {
					initStoryblokEvents();
				});
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
		font-size: var(--h1-fs, 60px);
	}

	h2 {
		font-size: 48;
		font-size: var(--h2-fs, 48px);
	}

	h3 {
		font-size: 34;
		font-size: var(--h3-fs, 34px);
	}

	h4 {
		font-size: 24;
		font-size: var(--h4-fs, 24px);
	}

	h5 {
		font-size: 20;
		font-size: var(--h5-fs, 20px);
	}

	h6 {
		font-size: 18;
		font-size: var(--h6-fs, 18px);
	}

	p,
	ol,
	ul {
		font-size: 1rem;
		font-size: var(--bs, 16px);
	}
</style>
