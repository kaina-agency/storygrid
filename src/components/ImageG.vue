<template lang="pug">
	.imgG(:style="cdn.pt" v-editable="blok")
		img(
			:srcset="cdn.srcset"
			:sizes="cdn.sizes"
			:src="cdn.fallback"
			:alt="blok.alt_text"
			:style="{objectFit: cdn.contain}"
		)
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			cdn() {
				let b = this.blok;
				let sizes = "";
				let srcset = "";
				let sb = "//a.storyblok.com";
				let bar = b.aspect_ratio || "16/9";
				let ar = bar.split("/")[1] / bar.split("/")[0];
				let pt = `padding-top: ${ar * 100}%;`;
				let fallback = srcset
					? srcset.split(", ")[2].replace("1200w", "")
					: b.image;
				let contain = b.options.includes("contain") ? "contain" : "cover";

				if (b.image.includes(sb)) {
					let img = b.image.replace(sb, "");
					let smart = b.options.includes("smart") ? "/smart" : "";
					let quality = `/filters:quality(${b.quality || "50"})`;
					let bps = [400, 800, 1200, 1600];

					bps.forEach(bp => {
						sizes += `(max-width: ${bp}px) ${bp}w, `;
						srcset +=
							"https://img2.storyblok.com" +
							`/${bp}x${b.options.includes("keep_aspect") ? "" : bp * ar}` +
							smart +
							quality +
							img +
							` ${bp}w, `;
					});
				}

				return {
					sizes: sizes,
					srcset: srcset,
					pt: pt,
					fallback: fallback,
					contain: contain
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	.imgG {
		position: relative;
		display: flex;
		width: 100%;
		overflow: hidden;

		img {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			min-height: 100%;
			max-height: 100%;
			min-width: 100%;
			max-width: 100%;
		}
	}
</style>