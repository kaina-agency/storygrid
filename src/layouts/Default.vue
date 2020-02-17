<template lang="pug">
	v-app(:style="appFonts")
		v-app-bar(app dense color="primary" dark :flat="settings.flat_header")
			v-app-bar-nav-icon(@click="drawer = !drawer")
			component(
				v-for="blok in settings.header"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-navigation-drawer(app v-if="(settings.drawer || {}).length" v-model="drawer")
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
	import WebFont from "webfontloader";

	export default {
		data: () => ({
			settings: {},
			drawer: null
		}),
		computed: {
			appFonts() {
				let responsive =
					"calc(minpx + (max - min) * ((100vw - 400px) / (1800 - 400)))";
				return {
					"--heading-font": this.settings.heading_font,
					"--body-font": this.settings.body_font,
					"--h1-font-size": responsive
						.replace("max", this.settings.h1_max)
						.replace(/min/g, this.settings.h1_min),
					"--h2-font-size": responsive
						.replace("max", this.settings.h2_max)
						.replace(/min/g, this.settings.h2_min),
					"--h3-font-size": responsive
						.replace("max", this.settings.h3_max)
						.replace(/min/g, this.settings.h3_min),
					"--h4-font-size": responsive
						.replace("max", this.settings.h4_max)
						.replace(/min/g, this.settings.h4_min),
					"--h5-font-size": responsive
						.replace("max", this.settings.h5_max)
						.replace(/min/g, this.settings.h5_min),
					"--h6-font-size": responsive
						.replace("max", this.settings.h6_max)
						.replace(/min/g, this.settings.h6_min),
					"--body-font-size": responsive
						.replace("max", this.settings.body_max)
						.replace(/min/g, this.settings.body_min)
				};
			}
		},
		methods: {
			async getSettings() {
				try {
					const results = await this.$fetch("/settings");
					let settingsData = results.data;
					let settings = settingsData.storyblokEntry.content || {};
					this.settings = settings;
					this.loadFonts(settings);
					this.setTheme(settings);
				} catch (error) {
					console.log(error);
				}
			},
			loadFonts(settings) {
				let googleFonts = settings.google_fonts.split(", ");
				let adobeFonts = settings.adobe_edge_web_fonts.split(", ").join(";");
				if (googleFonts.length > 0) {
					WebFont.load({
						google: {
							families: googleFonts
						},
						timeout: 2000
					});
				}
				if (adobeFonts.length > 0) {
					WebFont.load({
						typekit: {
							id: adobeFonts,
							api: "//use.edgefonts.net"
						},
						timeout: 2000
					});
				}
			},
			setTheme(settings) {
				let theme = settings.theme;
				if (theme == "light" || !theme) {
					this.$vuetify.theme.dark = false;
				} else if (theme == "dark") {
					this.$vuetify.theme.dark = true;
				}

				let colors = [
					"primary",
					"secondary",
					"accent",
					"error",
					"info",
					"success",
					"warning"
				];

				colors.forEach(color => {
					if (settings[color]) {
						this.$vuetify.theme.themes.light[color] = settings[color];
					}
					if (settings[color + "_dark"]) {
						this.$vuetify.theme.themes.dark[color] = settings[color + "_dark"];
					}
				});
			}
		},
		created() {
			this.getSettings();
		},
		mounted() {
			const loadStory = () => {
				window.storyblok.get(
					{
						slug: "settings",
						version: "draft"
					},
					data => {
						this.settings = data.story.content;
						this.loadFonts(data.story.content);
						this.setTheme(data.story.content);

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
	};
</script>

<style>
	body {
		font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
			"Helvetica Neue", Arial, sans-serif;
		margin: 0;
		padding: 0;
		line-height: 1.5;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--heading-font);
		line-height: 1.25;
		margin: 1rem 0;
	}

	h1 {
		font-size: var(--h1-font-size);
	}

	h2 {
		font-size: var(--h2-font-size);
	}

	h3 {
		font-size: var(--h3-font-size);
	}

	h4 {
		font-size: var(--h4-font-size);
	}

	h5 {
		font-size: var(--h5-font-size);
	}

	h6 {
		font-size: var(--h6-font-size);
	}

	p,
	ol,
	ul {
		font-size: var(--h6-font-size);
	}
</style>
