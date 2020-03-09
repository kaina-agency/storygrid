<template lang="pug">
	v-app
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
			:width="300"
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
	
		div(v-html="settings.inject_html")
		component(:is="'style'")
			| :root {
			|		--v-primary-base: {{!dark ? settings.primary : settings.primary_dark}};
			| 	--v-secondary-base: {{!dark ? settings.secondary : settings.secondary_dark}};
			| 	--v-accent-base: {{!dark ? settings.accent : settings.accent_dark}};
			| 	--bg: {{!dark ? settings.background : settings.background_dark}};
			| 	--card-bg: {{!dark ? settings.card_background : settings.card_background_dark}};
			| 	--heading-font: {{settings.heading_font}};
			| 	--body-font: {{settings.body_font}};
			| 	{{smoothType('--h1-fs', settings.h1_min, settings.h1_max)}}
			| 	{{smoothType('--h2-fs', settings.h2_min, settings.h2_max)}}
			| 	{{smoothType('--h3-fs', settings.h3_min, settings.h3_max)}}
			| 	{{smoothType('--h4-fs', settings.h4_min, settings.h4_max)}}
			| 	{{smoothType('--h5-fs', settings.h5_min, settings.h5_max)}}
			| 	{{smoothType('--h6-fs', settings.h6_min, settings.h6_max)}}
			| 	{{smoothType('--bs', settings.body_min, settings.body_max)}}
			| }
			| .{{$route.path.split("/")[1] + '-only'}} {display: auto;}
			| {{ settings.inject_css }}
</template>

<script>
	import config from "../../gridsome.config";
	export default {
		data: () => ({
			dark: false,
			drawer: null,
			draft: {}
		}),
		computed: {
			settings() {
				let settings = {};

				if (!this.draft) {
					settings = this.$static.allStoryblokEntry.edges[0].node.content;
				} else {
					settings = this.draft;
				}

				if (settings.default_theme === "dark") {
					this.$vuetify.theme.dark = true;
					this.dark = true;
				}

				return settings;
			},
			showHeader() {
				return (this.settings.header || {}).length || this.settings.mobile_only
					? this.$vuetify.breakpoint.mdAndDown
					: true;
			}
		},
		mounted() {
			if (window.location.href.includes("editor?")) {
				const loadStory = () => {
					window.storyblok.get(
						{
							slug: "settings",
							version: "draft"
						},
						data => {
							this.draft = data.story.content;
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

			document.body.classList = this.$route.path.split("/")[1];
		},
		methods: {
			smoothType(selector, min, max) {
				return `${selector}: calc(${min}px + (${max} - ${min}) * ((100vw - 400px) / (1800 - 400)));`;
			}
		},
		watch: {
			$route(to, from) {
				document.body.classList = this.$route.path.split("/")[1];
			}
		}
	};
</script>

<style lang="scss">
	body {
		margin: 0;
		padding: 0;
	}

	#app.v-application {
		font-family: var(--body-font, Roboto), "Helvetica Neue", Arial, sans-serif;
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

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--heading-font, Roboto), "Helvetica Neue", Arial, sans-serif;

		&:not(.v-sheet) {
			line-height: 1.25;
			margin: 0.25em 0;
		}
	}

	h1,
	.h1 {
		font-size: 60;
		font-size: var(--h1-fs, 60px);
	}

	h2,
	.h2 {
		font-size: 48;
		font-size: var(--h2-fs, 48px);
	}

	h3,
	.h3 {
		font-size: 34;
		font-size: var(--h3-fs, 34px);
	}

	h4,
	.h4 {
		font-size: 24;
		font-size: var(--h4-fs, 24px);
	}

	h5,
	.h5 {
		font-size: 20;
		font-size: var(--h5-fs, 20px);
	}

	h6,
	.h6 {
		font-size: 18;
		font-size: var(--h6-fs, 18px);
	}

	p,
	ol,
	ul {
		font-size: 1rem;
		font-size: var(--bs, 16px);
	}

	hr:not(.v-divider) {
		border: none;
		border-top: 1px solid gray;
		margin: 2rem 0 !important;
	}

	.bold {
		font-weight: bold;
	}

	.italic {
		font-style: italic;
	}
</style>

<static-query>
	query {
		allStoryblokEntry(filter: { slug: { eq: "settings" } }) {
			edges {
				node {
					content
				}
			}
		}
	}
</static-query>