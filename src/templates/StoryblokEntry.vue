<template>
	<Layout>
		<component
			v-if="story.content.component"
			:key="story.content._uid"
			:blok="story.content"
			:is="story.content.component"
		/>
		<component :is="'style'">
			{{ story.content.inject_css }}
		</component>
	</Layout>
</template>

<script>
	export default {
		name: "StoryblokEntryTemplate",
		computed: {
			story() {
				return this.$page.storyblokEntry;
			},
		},
		metaInfo() {
			let slug = this.$page.storyblokEntry.slug;
			if (slug !== "settings") {
				let meta = this.$page.storyblokEntry.content.meta;
				let image = this.$page.storyblokEntry.content.post_image.filename || "";
				function titleCase(string) {
					var sentence = string.toLowerCase().split(" ");
					for (var i = 0; i < sentence.length; i++) {
						sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
					}
					return sentence;
				}
				return {
					title: meta.title || titleCase(slug),
					meta: [
						{
							key: "description",
							name: "description",
							content: meta.description || process.env.GRIDSOME_DESCRIPTION,
						},
						{
							key: "og:title",
							name: "og:title",
							content: meta.title || titleCase(slug),
						},
						{
							key: "og:description",
							name: "og:description",
							content: meta.description || process.env.GRIDSOME_DESCRIPTION,
						},
						{
							key: "og:image",
							name: "og:image",
							content: image || process.env.GRIDSOME_IMAGE,
						},
					],
				};
			}
		},
	};
</script>

<page-query>
query StoryblokEntry ($id: ID) {
  storyblokEntry (id: $id) {
    id
    slug
    content
  }
}
</page-query>