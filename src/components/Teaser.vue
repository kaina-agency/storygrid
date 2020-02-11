<template>
	<button class="mdc-button mdc-button--raised">
		<div class="mdc-button__ripple"></div>
		<span class="mdc-button__label">{{ blok.headline }}</span>
	</button>
</template>

<script>
	import { MDCRipple } from "@material/ripple";

	export default {
		props: ["blok"],
		mounted() {
			const buttonRipple = new MDCRipple(document.querySelector(".mdc-button"));
		}
	};
</script>