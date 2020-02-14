<template lang="pug">
	.imgG(
			:class="blok.class"
			:style="src.pt + blok.style"
			v-editable="blok"
		)
			picture
				source(:srcset="src.srcset" :sizes="src.sizes" type="image/webp")
				source(:srcset="src.jpegSrcset" :sizes="src.sizes" type="image/jpeg")
				img(
					:srcset="src.srcset"
					:sizes="src.sizes"
					:src="src.src"
					:alt="blok.alt_text"
					:style="{objectFit: src.contain}"
				)
</template>

<script>
	export default {
		props: ["blok"],
		computed: {
			src() {
				let b = this.blok;
				let [sizes, srcset, jpegSrcset, src] = "";
				let sb = "//a.storyblok.com";
				let ba = b.aspect_ratio || "16/9";
				let r = ba.split("/")[1] / ba.split("/")[0];
				let contain = b.options.includes("contain") ? "contain" : "cover";
				let pt = `padding-top: ${r * 100}%;`;

				if (b.image.includes(sb)) {
					let cdn = "https://img2.storyblok.com";
					let s = b.options.includes("smart") ? "/smart" : "";
					let q = `/filters:quality(${b.quality || "50"})`;
					let f = ":format(webp)";
					let i = b.image.replace(sb, "");
					let bps = [400, 800, 1200, 1600];

					bps.forEach(bp => {
						let w = b.options.includes("large") ? bp : Math.floor(bp / 2);
						let h = b.options.includes("keep_aspect") ? "" : Math.floor(w * r);
						let d = `/${w}x${h}`;

						sizes += `(max-width: ${bp}px) ${bp}w, `;
						srcset += cdn + d + s + q + f + i + ` ${bp}w, `;
						jpegSrcset += cdn + d + s + q + i + ` ${bp}w, `;
					});

					src = srcset.split(", ")[2].replace("1200w", "");
				} else {
					src = b.image;
				}

				return {
					sizes: sizes,
					srcset: srcset,
					jpegSrcset: jpegSrcset,
					pt: pt,
					src: src,
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

		img,
		picture {
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