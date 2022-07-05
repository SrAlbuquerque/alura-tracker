<template>
  <div class="column is-three-quarter content">
    <FormComponent @saveTask="saveTask" />
    <div class="lista">
      <TaskComponent
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @onSelectedTask="selectedTask"
      />
      <BoxComponent v-if="emptyList"
        >Você não está muito produtivo hoje :(</BoxComponent
      >
      <div
        class="modal"
        :class="{ 'is-active': onSelectedTask }"
        v-if="onSelectedTask"
      >
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Editar Tarefa</p>
            <button
              class="delete"
              aria-label="close"
              @click="closeModal"
            ></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label for="descriptionTask" class="label">Nome da tarefa</label>
              <input
                type="text"
                class="input"
                v-model="onSelectedTask.description"
                id="descriptionTask"
              />
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="editTask">Salvar</button>
            <button class="button" @click="closeModal">Voltar</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FormComponent from "../components/FormComponent.vue";
import TaskComponent from "../components/TaskComponent.vue";
import BoxComponent from "../components/BoxComponent.vue";

import { useStore } from "@/store";
import {
  GET_PROJECTS,
  GET_TASKS,
  POST_TASKS,
  PUT_TASKS,
} from "@/store/types-actions";
import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "TasksView",
  components: {
    FormComponent,
    TaskComponent,
    BoxComponent,
  },
  data() {
    return {
      onSelectedTask: null as ITask | null,
    };
  },
  computed: {
    emptyList(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.store.dispatch(POST_TASKS, task);
    },

    selectedTask(task: ITask) {
      this.onSelectedTask = task;
    },

    closeModal() {
      this.onSelectedTask = null;
    },

    editTask() {
      this.store
        .dispatch(PUT_TASKS, this.onSelectedTask)
        .then(() => this.closeModal());
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);
    return {
      tasks: computed(() => store.state.tasks),
      store,
      //notifier,
    };
  },
});
</script>

<style>
</style>
