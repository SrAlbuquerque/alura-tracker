<template>
  <div class="box has-text-weight-bold">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxComponent",
});
</script>

<style scoped>
.box {
  background: #faf0ca;
}
</style>