<template lang="pug">
	v-toolbar(
		:color="blok.color"
		:dark="blok.options.includes('dark')"
		:dense="blok.options.includes('dense')"
		:flat="blok.options.includes('flat')"
		:short="blok.options.includes('short')"
		:tag="blok.tag ? blok.tag : 'div'"
		:tile="blok.options.includes('tile')"
		:class="blok.class"
		:style="blok.style"
		v-editable="blok"
	)
		v-toolbar-title(v-if="blok.text") {{blok.text}}
		v-spacer(v-if="blok.text")
		component(
			v-for="blok in blok.content"
			:key="blok._uid"
			:blok="blok"
			:is="blok.component"
		)
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>