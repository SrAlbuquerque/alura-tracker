<template>
  <BoxComponent>
    <div class="columns click" @click="selectedTask">
      <div class="column is-4">
        {{ task.description || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ task.project?.name || "N/D" }}
      </div>
      <div class="column">
        <StopwatchComponent :timeInSeconds="task.durationInSeconds" />
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StopwatchComponent from "./StopwatchComponent.vue";
import BoxComponent from "./BoxComponent.vue";
import ITask from "../interfaces/ITask";

export default defineComponent({
  name: "TaksComponent",
  emits: ["onSelectedTask"],

  components: {
    StopwatchComponent,
    BoxComponent,
  },

  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },

  methods: {
    selectedTask(): void {
      this.$emit("onSelectedTask", this.task);
    },
  },
});
</script>

<style scoped>
.click:hover {
  cursor: pointer;
}
</style>