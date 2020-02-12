<template lang="pug">
	v-container(
		:class="[blok.bottom_margin, blok.class]"
		:style="blok.style"
	)
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