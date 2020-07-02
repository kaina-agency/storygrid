<template lang="pug">
	v-btn(
		:color="blok.color"
		:depressed="blok.style.includes('depressed')"
		:disabled="disabled"
		:fab="blok.style.includes('fab')"
		:href="href"
		:icon="blok.style.includes('icon')"
		:outlined="blok.style.includes('outlined')"
		:replace="blok.link.linktype == 'story'"
		ripple
		:rounded="blok.style.includes('rounded')"
		:text="blok.style.includes('text')"
		:tile="blok.style.includes('tile')"
		:to="to"
		:type="type"
		:x-small="blok.size == 'xs'"
		:small="blok.size == 'sm'"
		:medium="blok.size == 'md'"
		:large="blok.size == 'lg'"
		:x-large="blok.size == 'xl'"
		v-editable="blok"
		@click="hashHandler"
	) 
		div.g-icon(
			v-if="blok.icon"
			v-html="blok.icon"
			notranslate
			:style="left ? 'margin-right: 8px;' : ''"
		)
		| {{blok.style.includes('fab') || blok.style.includes('icon') ? '' : blok.text}}
</template>

<script>
	export default {
		name: "Button",
		props: ["blok", "disabled", "type"],
		computed: {
			href() {
				const l = this.blok.link;
				switch (l.linktype) {
					case "story":
						return "";
						break;
					case "url":
						return l.url;
						break;
					case "email":
						return "mailto:" + l.url;
						break;
					case "asset":
						return l.url;
						break;
				}
			},
			to() {
				const l = this.blok.link;
				let path = l.cached_url;
				if (l.linktype == "story") {
					switch (path) {
						case "home":
							return "/";
							break;
						case "":
							return undefined;
						default:
							return "/" + path;
					}
				}
			},
			left() {
				return this.blok.style.includes("fab") || this.blok.style.includes("icon")
					? false
					: true;
			}
		},
		methods: {
			hashHandler() {
				let l = this.blok.link;
				if (l.linktype === "url" && l.url.startsWith("#")) {
					let name = l.url.replace("#", "");
					document.querySelector(`[data-name='${name}'`).scrollIntoView();
				}
			}
		}
	};
</script>

<style>
	.v-btn--rounded .g-icon {
		margin-left: 4px;
	}
</style>
