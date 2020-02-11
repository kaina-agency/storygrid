<template>
<button class="mdc-button">
  <div class="mdc-button__ripple"></div>
  <span class="mdc-button__label">{{blok.headline}}</span>
</button>
</template>

<script>
export default {
  props: ['blok']
}
</script>