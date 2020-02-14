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
				let bo = String(b.options);
				let [sizes, srcset, jpegSrcset, src, c, pt] = "";
				let sb = "//a.storyblok.com";
				let ba = b.aspect_ratio || "16/9";
				let br = ba.split("/")[1] / ba.split("/")[0];
				let bpt = `padding-top: ${br * 100}%;`;
				let bv = b.vertical_alignment || 5;
				let bh = b.horizontal_alignment || 5;
				let keepAspect = bo.includes("keep_aspect");
				let contain = bo.includes("contain") ? "contain" : "cover";
				pt = bpt;

				if (b.image.includes(sb)) {
					let cdn = "https://img2.storyblok.com";
					let s = bo.includes("smart") ? "/smart" : "";
					let q = `/filters:quality(${b.quality || "50"})`;
					let f = ":format(webp)";
					let i = b.image.replace(sb, "");
					let ia = String(i.match(/\d+x\d+/g));
					let ir = ia.split("x")[1] / ia.split("x")[0];
					let ipt = `padding-top: ${ir * 100}%;`;
					pt = bo.includes("natural") ? ipt : bpt;

					let bps = [400, 800, 1200, 1600];

					bps.forEach(bp => {
						let w = b.high_quality ? bp : Math.floor(bp / 2);
						let h = keepAspect ? "" : Math.floor(w * br);
						let d = `/${w}x${h}`;
						c = s ? "" : `:focal(${0}x${h * bv}:${w * bh}x${0})`;

						sizes += `(max-width: ${bp}px) ${bp}w, `;
						srcset += cdn + d + s + q + f + c + i + ` ${bp}w, `;
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