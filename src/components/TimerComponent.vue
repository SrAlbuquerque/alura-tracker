<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopwatchComponent :timeInSeconds="timeInSeconds" />

    <button class="button" @click="start" :disabled="startingTimer">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="stop" :disabled="!startingTimer">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import StopwatchComponent from "./StopwatchComponent.vue";

export default defineComponent({
  name: "TimerComponent",

  emits: ["timerFinished"],

  components: {
    StopwatchComponent,
  },

  data() {
    return {
      timeInSeconds: 0,
      timer: 0,
      startingTimer: false,
    };
  },

  methods: {
    start() {
      this.startingTimer = true;
      this.timer = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000);
    },

    stop() {
      this.startingTimer = false;
      clearInterval(this.timer);
      this.$emit("timerFinished", this.timeInSeconds);
      this.timeInSeconds = 0;
    },
  },
});
</script>

<style>
</style>