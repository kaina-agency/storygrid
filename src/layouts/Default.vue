<template lang="pug">
v-app(:class="path")
	v-app-bar(
		app,
		:clipped-left="set.full_width || false",
		color="primary",
		:dense="set.dense == false ? false : true",
		:dark="set.light == true ? false : true",
		:flat="set.flat",
		:hide-on-scroll="set.hide_on_scroll",
		:light="set.light",
		v-if="appBar"
	)
		v-app-bar-nav-icon(
			@click="drawer = !drawer",
			v-if="(set.drawer || {}).length || false",
			:class="set.drawer_mobile_only ? 'hidden-md-and-up' : ''"
		)
		component(
			v-for="blok in set.header",
			:key="blok._uid",
			:blok="blok",
			:is="blok.component"
		)
	v-navigation-drawer(
		app,
		:clipped="set.full_width || false",
		:class="set.drawer_class || 'secondary'",
		:disable-resize-watcher="set.drawer_mobile_only",
		:dark="set.light_drawer == true ? false : true",
		:light="set.light_drawer",
		:width="300",
		v-if="(set.drawer || {}).length || false",
		v-model="drawer"
	)
		component(
			v-for="blok in set.drawer",
			:key="blok._uid",
			:blok="blok",
			:is="blok.component"
		)
	v-content(app)
		slot
		component(
			v-for="blok in set.app_globals",
			:key="blok._uid",
			:blok="blok",
			:is="blok.component"
		)

	div(v-html="set.inject_html")
	component(:is="'style'")
		| :root {
		| --v-primary-base: {{ !dark ? set.primary : set.primary_dark }};
		| --v-secondary-base: {{ !dark ? set.secondary : set.secondary_dark }};
		| --v-accent-base: {{ !dark ? set.accent : set.accent_dark }};
		| --bg: {{ !dark ? set.background : set.background_dark }};
		| --card-bg: {{ !dark ? set.card_background : set.card_background_dark }};
		| --heading-font: {{ set.heading_font }};
		| --body-font: {{ set.body_font }};
		| {{ smoothType('--h1-fs', set.h1_min, set.h1_max) }}
		| {{ smoothType('--h2-fs', set.h2_min, set.h2_max) }}
		| {{ smoothType('--h3-fs', set.h3_min, set.h3_max) }}
		| {{ smoothType('--h4-fs', set.h4_min, set.h4_max) }}
		| {{ smoothType('--h5-fs', set.h5_min, set.h5_max) }}
		| {{ smoothType('--h6-fs', set.h6_min, set.h6_max) }}
		| {{ smoothType('--bs', set.body_min, set.body_max) }}
		| }
		| {{ set.inject_css }}
</template>

<script>
	import config from "../../gridsome.config";
	export default {
		data: () => ({
			dark: false,
			appBar: false,
			drawer: false,
			draft: {},
			path: "",
			set: {},
		}),
		created() {
			let settings = {};

			if (this.draft._uid) {
				settings = this.draft;
			} else {
				settings = this.$static.allStoryblokEntry.edges[0].node.content;
			}

			if (settings.default_theme === "dark") {
				this.$vuetify.theme.dark = true;
				this.dark = true;
			}

			if (settings.mobile_only) {
				this.appBar = this.$vuetify.breakpoint.mdAndDown;
			} else {
				this.appBar = true;
			}

			if (!settings.drawer_mobile_only) {
				this.drawer = null;
			}

			this.set = settings;
		},
		mounted() {
			if (window.top !== window.self) {
				document.body.classList.add("in-editor");
				console.log("Edit Mode");

				this.path = window.location.search.replace("?path=", "").split("%")[0];

				const loadStory = () => {
					window.storyblok.get(
						{
							slug: "settings",
							version: "draft",
						},
						(data) => {
							this.set = data.story.content;
						}
					);
				};

				const initStoryblokEvents = () => {
					loadStory();

					let sb = window.storyblok;

					sb.on(["change", "published", "input"], (payload) => {
						loadStory();
					});

					sb.pingEditor(() => {
						if (sb.inEditor) {
							sb.enterEditmode();
						}
					});
				};

				const loadStoryblokBridge = (cb) => {
					let sbConfigs = config.plugins.filter((item) => {
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
			} else {
				this.path = this.$route.path.split("/")[1];
			}
		},
		methods: {
			smoothType(selector, min, max) {
				return `${selector}: calc(${min}px + (${max} - ${min}) * ((100vw - 400px) / (1800 - 400)));`;
			},
		},
		watch: {
			$route(to, from) {
				this.path = this.$route.path.split("/")[1];
			},
		},
	};
</script>

<style lang="scss">
	html {
		overflow-y: auto !important;
	}

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

	.v-navigation-drawer__content {
		border-right: 1px solid transparent;
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
			margin: calc(1rem) 0;
		}
	}

	h1,
	.h1,
	.h1 > * {
		font-size: 60;
		font-size: var(--h1-fs, 60px);
	}

	h2,
	.h2,
	.h2 > * {
		font-size: 48;
		font-size: var(--h2-fs, 48px);
	}

	h3,
	.h3,
	.h3 > * {
		font-size: 34;
		font-size: var(--h3-fs, 34px);
	}

	h4,
	.h4,
	.h4 > * {
		font-size: 24;
		font-size: var(--h4-fs, 24px);
	}

	h5,
	.h5,
	.h5 > * {
		font-size: 20;
		font-size: var(--h5-fs, 20px);
	}

	h6,
	.h6,
	.h6 > * {
		font-size: 18;
		font-size: var(--h6-fs, 18px);
	}

	p {
		line-height: 1.5;
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

	.bold,
	.bold * {
		font-weight: bold !important;
	}

	.italic {
		font-style: italic;
	}

	blockquote {
		padding: 0 0 0 16px;
		border-left: 6px solid var(--v-primary-base);
	}

	.v-icon {
		svg {
			fill: currentColor;
		}
	}

	.in-editor {
		.v-btn,
		.v-card {
			pointer-events: none !important;
		}
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