<template>
  <section>
    <strong class="display">{{ elapsedTimer }}</strong>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "StopwatchComponent",

  props: {
    timeInSeconds: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    elapsedTimer() {
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style>
.display {
  color: var(--primary-text);
}
</style>