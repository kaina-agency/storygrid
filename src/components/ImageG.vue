<template lang="pug">
	v-lazy.imgG(
			:class="blok.class"
			:style="src.pt + src.filters + blok.style"
			v-editable="blok"
		)
			picture
				source(:srcset="src.srcset" :sizes="src.sizes" type="image/webp")
				source(:srcset="src.jpegSrcset" :sizes="src.sizes" type="image/jpeg")
				img(
					loading="lazy"
					:srcset="src.srcset"
					:sizes="src.sizes"
					:src="src.src"
					:alt="blok.alt_text"
					:style="{objectFit: src.contain}"
				)
</template>

<script>
	import { VLazy } from "vuetify/lib";
	export default {
		props: ["blok"],
		components: { VLazy },
		computed: {
			src() {
				const b = this.blok;
				const bo = String(b.options);
				let [sizes, srcset, jpegSrcset, src, c, pt] = ["", "", "", "", "", ""];
				const sb = "//a.storyblok.com";
				const ba = b.aspect_ratio || "16/9";
				const br = ba.split("/")[1] / ba.split("/")[0];
				const bpt = `padding-top: ${br * 100}%;`;
				const bv = b.vertical_alignment || 50;
				const bh = b.horizontal_alignment || 50;
				const keepAspect = bo.includes("keep_aspect");
				const contain = bo.includes("contain") ? "contain" : "cover";
				const brt = `brightness(${b.brightness || 1}) `;
				const cnt = `contrast(${b.contrast || 1}) `;
				const sat = `saturate(${b.saturation || 1}) `;
				const grs = `grayscale(${b.grayscale ? 1 : 0}) `;
				const filters = `filter: ${brt + cnt + sat + grs};`;
				pt = bpt;

				if (b.image.includes(sb)) {
					const cdn = "https://img2.storyblok.com";
					const s = bo.includes("smart") ? "/smart" : "";
					const q = `/filters:quality(${b.quality || "50"})`;
					const f = ":format(webp)";
					const i = b.image.replace(sb, "");
					const ia = String(i.match(/\d+x\d+/g));
					const ih = ia.split("x")[1];
					const iw = ia.split("x")[0];
					const ir = ih / iw;
					const ipt = `padding-top: ${ir * 100}%;`;
					pt = bo.includes("natural") ? ipt : bpt;

					const coord = (value, upperBound) => {
						value = Math.max(0, value);
						value = Math.min(value, upperBound);
						return Math.ceil(value);
					};
					const top = coord((bv / 100) * ih - 100 / 2, ih);
					const left = coord((bh / 100) * iw - 100 / 2, iw);
					const bottom = coord(top + 100, ih);
					const right = coord(left + 100, iw);
					const fp = `:focal(${left}x${top}:${right}x${bottom})`;

					const bps = b.max_quality.split(",") || [400, 800];

					bps.forEach(bp => {
						const w = bp;
						const h = keepAspect ? "" : Math.floor(w * br);
						const d = `/${w}x${h}`;

						sizes += `(max-width: ${bp}px) ${bp}w, `;
						srcset += cdn + d + s + q + f + fp + i + ` ${bp}w, `;
						jpegSrcset += cdn + d + s + q + fp + i + ` ${bp}w, `;
					});

					let sources = srcset.split(", ");
					src = sources[sources.length - 2];
				} else {
					src = b.image;
				}

				return {
					sizes: sizes,
					srcset: srcset,
					jpegSrcset: jpegSrcset,
					pt: pt,
					src: src,
					contain: contain,
					filters: filters
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