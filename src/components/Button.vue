<template lang="pug">
v-btn(
	:color="blok.color",
	:dark="blok.style.includes('dark')",
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
	:class="blok.class",
	:style="blok.styles",
	@click="handleClick"
) 
	v-icon(
		v-if="blok.icon || blok.share_button",
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
			} else {
				if (this.blok.share_button) {
					let iOS = `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z" /></svg>`;
					let other = `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" /></svg>`;
					let isIOS = [
						"iPad Simulator",
						"iPhone Simulator",
						"iPod Simulator",
						"iPad",
						"iPhone",
						"iPod",
					].includes(navigator.platform);
					this.$refs.icon.$el.innerHTML = isIOS ? iOS : other;
				}
			}
			if (
				!navigator.share &&
				window.location.hostname !== "localhost" &&
				this.blok.share_button === true
			) {
				this.$el.style.display = "none";
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
			handleClick() {
				if (this.blok.link.url.startsWith("#")) {
					let l = this.blok.link;
					if (l.linktype === "url" && l.url.startsWith("#")) {
						let name = l.url.replace("#", "");
						document.querySelector(`[data-name='${name}'`).scrollIntoView();
					}
				} else if (this.blok.share_button === true) {
					if (navigator.share) {
						navigator
							.share({
								title: document.querySelector("head title").innerText,
								url: window.location.href,
							})
							.then(() => console.log("Successful share"))
							.catch((error) => console.log("Error sharing", error));
					} else {
						this.$el.style.display = "none";
					}
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