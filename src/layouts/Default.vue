<template lang="pug">
	v-app(:style="appStyles")
		div(v-html="settings.inject_html")
		component(:is="'style'")
			| {{ settings.inject_css }}
		v-app-bar(
			app
			:clipped-left="settings.full_width || false"
			color="primary"
			:dense="settings.dense == false ? false : true"
			:dark="settings.light == true ? false : true"
			:flat="settings.flat"
			:hide-on-scroll="settings.hide_on_scroll"
			:light="settings.light"
			v-if="showHeader"
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
			:clipped="settings.full_width || false"
			:class="settings.drawer_class || 'secondary'"
			:dark="settings.light_drawer == true ? false : true"
			:light="settings.light_drawer"
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
					"--body-font": s.body_font,
					"--card-bg": s.card_background
				};
				let responsive =
					"calc(minpx + (max - min) * ((100vw - 400px) / (1800 - 400)))";
				let themeColors = [
					"primary",
					"secondary",
					"accent",
					"success",
					"error",
					"info",
					"warning"
				];

				if (s.default_theme === "dark") {
					this.$vuetify.theme.dark = true;
					styles["--bg"] = s.background_dark;
					styles["--card-bg"] = s.card_background_dark;
				} else {
					styles["--bg"] = s.background;
					styles["--card-bg"] = s.card_background;
				}

				themeColors.forEach(color => {
					if (s[color]) {
						this.$vuetify.theme.themes.light[color] = s[color];
					}
					if (s[color + "_dark"]) {
						this.$vuetify.theme.themes.dark[color] = s[color + "_dark"];
					}
				});

				for (let i = 1; i <= 6; i++) {
					styles["--h" + i + "-fs"] = responsive
						.replace(/min/g, s["h" + i + "_min"])
						.replace(/max/g, s["h" + i + "_max"]);
				}

				styles["--bs"] = responsive
					.replace(/min/g, s.body_min)
					.replace(/max/g, s.body_max);

				return styles;
			},
			showHeader() {
				return (this.settings.header || {}).length || this.settings.mobile_only
					? this.$vuetify.breakpoint.mdAndDown
					: true;
			}
		},
		mounted() {
			if (window.location !== window.parent.location) {
				const loadStory = () => {
					window.storyblok.get(
						{
							slug: "settings",
							version: "draft"
						},
						data => {
							this.settings = data.story.content;
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

			document.body.classList = this.$route.path.replace("/", " ").trim();
		},
		watch: {
			$route(to, from) {
				document.body.classList = this.$route.path.replace("/", " ").trim();
			}
		}
	};
</script>

<style lang="scss">
	body {
		margin: 0;
		padding: 0;
	}

	.v-application {
		font-family: var(--body-font, Roboto), "Helvetica Neue", Arial, sans-serif;
	}

	#app {
		background: var(--bg);

		&:before {
			content: "";
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: var(--bg);
		}
	}

	.grecaptcha-badge {
		display: none !important;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--heading-font, Roboto), "Helvetica Neue", Arial, sans-serif;
		line-height: 1;
		margin: 1rem 0;
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
