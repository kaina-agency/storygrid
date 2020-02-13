<template lang="pug">
	.q-typer(:class="blok.class" :style="blok.style" v-editable="blok")
		| {{ blok.sentence }}
		ClientOnly
			vue-typer(
				:text="blok.text.split(',')"
				:repeat="Infinity"
				:shuffle="false"
				initial-action="typing"
				:pre-type-delay="70"
				:type-delay="70"
				:pre-erase-delay="2000"
				:erase-delay="250"
				erase-style="select-all"
				:erase-on-complete="false"
				caret-animation="smooth"
				:style="`min-width: ${minWidth};`"
			)
</template>

<script>
	export default {
		props: ["blok"],
		components: { VueTyper: () => import("vue-typer") },
		computed: {
			minWidth() {
				let arr = this.blok.text.split(",");
				let longest = Math.max(...arr.map(el => el.length));
				let reduced = longest * 0.6;
				return reduced + "em";
			}
		}
	};
</script>

<style>
	.q-typer {
		overflow: hidden;
	}
	.vue-typer .left,
	.vue-typer .right {
		float: none !important;
	}
	.vue-typer {
		display: inline-block;
	}
</style>
