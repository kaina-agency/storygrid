<template>
	<button class="mdc-button mdc-button--raised">
		<div class="mdc-button__ripple"></div>
		<span class="mdc-button__label">{{ blok.headline }}</span>
	</button>
</template>

<script>
	export default {
		props: ["blok"]
	};
</script>