<template lang="pug">
	v-app
		v-app-bar(app dense color="primary" dark :flat="story.content.flat_header")
			component(
				v-for="blok in story.content.header"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-navigation-drawer(app)
			component(
				v-for="blok in story.content.drawer"
				:key="blok._uid"
				:blok="blok"
				:is="blok.component"
			)
		v-content(app)
			v-container
				slot
</template>

<script>
	import config from "../../gridsome.config";

	export default {
		data() {
			return {
				story: { content: {} }
			};
		},
		mounted() {
			const loadStory = () => {
				window.storyblok.get(
					{
						slug: "settings",
						version: "draft"
					},
					data => {
						this.story = data.story;
					}
				);
			};
			const initStoryblokEvents = () => {
				loadStory();

				let sb = window.storyblok;

				sb.on(["change", "published"], payload => {
					loadStory();
				});

				sb.on("input", payload => {
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
</style>
