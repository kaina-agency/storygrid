<template lang="pug">
.imgG(
	:class="blok.class",
	:style="src.filters + blok.style",
	v-editable="blok"
)
	div(:style="src.pt")
		picture
			source(:srcset="src.srcset", :sizes="src.sizes", type="image/webp")
			source(:srcset="src.jpegSrcset", :sizes="src.sizes", type="image/jpeg")
			img(
				:srcset="src.srcset",
				:sizes="src.sizes",
				:src="src.src",
				:alt="blok.image.alt || blok.image.name",
				:style="{ objectFit: src.contain }",
				loading="lazy"
			)
		.imgG__content
			component(
				v-for="blok in blok.content",
				:key="blok._uid",
				:blok="blok",
				:is="blok.component"
			)
</template>

<script>
	export default {
		name: "ImageG",
		props: ["blok"],
		computed: {
			src() {
				const b = this.blok;
				const bo = String(b.options);

				let [sizes, srcset, jpegSrcset, src, c, pt] = ["", "", "", "", "", ""];

				const sb = "https://a.storyblok.com";

				const ba = b.aspect_ratio || "16/9";
				const br = ba.split("/")[1] / ba.split("/")[0];
				const bpt = `padding-top: ${br * 100}%;`;

				const keepAspect = bo.includes("keep_aspect");
				const contain = bo.includes("contain") ? "contain" : "cover";

				const brt = `brightness(${b.brightness || 1}) `;
				const cnt = `contrast(${b.contrast || 1}) `;
				const sat = `saturate(${b.saturation || 1}) `;
				const grs = `grayscale(${b.grayscale ? 1 : 0}) `;
				const filters = `filter: ${brt + cnt + sat + grs};`;
				pt = bpt;

				if (b.image.filename.includes(sb) && !b.image.filename.endsWith(".svg")) {
					const cdn = "https://img2.storyblok.com";
					const s = bo.includes("smart") ? "/smart" : "";
					const q = `/filters:quality(${b.quality || "50"})`;
					const f = ":format(webp)";
					const i = b.image.filename
						.replace(sb, "")
						.replace("//a.storyblok.com", "");
					const ia = String(i.match(/\d+x\d+/g));
					const ih = ia.split("x")[1];
					const iw = ia.split("x")[0];
					const ir = ih / iw;
					const ipt = `padding-top: ${ir * 100}%;`;
					pt = bo.includes("natural") ? ipt : bpt;

					const fp = b.image.focus ? `:focal(${b.image.focus})` : "";

					const bps = b.max_quality.split(",") || [400, 800];

					bps.forEach((bp) => {
						const w = bp;
						const h = keepAspect ? "" : Math.floor(w * br);
						const d = `/${w}x${h}`;

						sizes += `(max-width: ${bp}px) ${bp}w, `;
						srcset += cdn + d + s + q + f + fp + i + ` ${bp}w, `;
						jpegSrcset += cdn + d + s + q + fp + i + ` ${bp}w, `;
					});

					let sources = srcset.split(", ");
					src = sources[sources.length - 2];
				} else if (b.use_placekitten === true) {
					let ar = b.aspect_ratio.split("/");
					let w = b.max_quality.split(",")[1];
					let h = Math.floor((w * ar[1]) / ar[0]);
					let rh = h + Math.floor(Math.random() * Math.floor(100));
					src = `https://placekitten.com/${w}/${rh}`;
				} else {
					src = b.image.filename;
				}

				return {
					sizes: sizes,
					srcset: srcset,
					jpegSrcset: jpegSrcset,
					pt: pt,
					src: src,
					contain: contain,
					filters: filters,
				};
			},
		},
	};
</script>

<style lang="scss">
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

		&__content {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.5);
		}
	}
</style>