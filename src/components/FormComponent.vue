<template>
  <div class="box form">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="projectId">
            <option value="">Selecione o projeto</option>
            <option
              :value="project.id"
              v-for="project in projects"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <timerComponent @timerFinished="finishTask" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import TimerComponent from "./TimerComponent.vue";

import { key } from "../store/index";

export default defineComponent({
  name: "FormComponent",

  emits: ["saveTask"],

  components: {
    TimerComponent,
  },

  data() {
    return {
      description: "",
      projectId: "",
    };
  },

  methods: {
    finishTask(elapsedTimer) {
      this.$emit("saveTask", {
        durationInSeconds: elapsedTimer,
        description: this.description,
        project: this.projects.find((proj) => proj.id == this.projectId),
      });
      this.description = "";
    },
  },

  setup() {
    const store = useStore(key);
    return {
      projects: computed(() => store.state.projects),
    };
  },
});
</script>

<style>
.form {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
</style>