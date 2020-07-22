<template lang="pug">
v-btn(
	:color="blok.color",
	:depressed="blok.style.includes('depressed')",
	:disabled="disabled",
	:fab="blok.style.includes('fab')",
	:href="href",
	:icon="blok.style.includes('icon')",
	:outlined="blok.style.includes('outlined')",
	:replace="blok.link.linktype == 'story'",
	ripple,
	:rounded="blok.style.includes('rounded')",
	:text="blok.style.includes('text')",
	:tile="blok.style.includes('tile')",
	:to="to",
	:type="type",
	:x-small="blok.size == 'xs'",
	:small="blok.size == 'sm'",
	:medium="blok.size == 'md'",
	:large="blok.size == 'lg'",
	:x-large="blok.size == 'xl'",
	v-editable="blok",
	@click="hashHandler"
) 
	v-icon(
		v-if="blok.icon",
		ref="icon",
		:left="!blok.style.includes('fab') && !blok.style.includes('icon')",
		:x-small="blok.size == 'xs'",
		:small="blok.size == 'sm'",
		:medium="blok.size == 'md'",
		:large="blok.size == 'lg'",
		:x-large="blok.size == 'xl'"
	)
	| {{ blok.style.includes('fab') || blok.style.includes('icon') ? '' : blok.text }}
</template>

<script>
	export default {
		name: "Button",
		props: ["blok", "disabled", "type"],
		mounted() {
			if (this.blok.icon) {
				this.$refs.icon.$el.innerHTML = this.blok.icon;
			}
		},
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
						return "mailto:" + l.email;
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
			},
		},
		methods: {
			hashHandler() {
				let l = this.blok.link;
				if (l.linktype === "url" && l.url.startsWith("#")) {
					let name = l.url.replace("#", "");
					document.querySelector(`[data-name='${name}'`).scrollIntoView();
				}
			},
		},
	};
</script>

<style lang="scss">
	.v-btn__content .v-icon,
	.v-btn__content .v-icon--left {
		&[style*="12"],
		&[style*="12"] svg {
			height: 12px;
			width: 12px;
		}
		&[style*="16"],
		&[style*="16"] svg {
			height: 16px;
			width: 16px;
		}
		&[style*="36"],
		&[style*="36"] svg {
			height: 32px;
			width: 32px;
		}
		&[style*="40"],
		&[style*="40"] svg {
			height: 36px;
			width: 36px;
		}
	}
</style>