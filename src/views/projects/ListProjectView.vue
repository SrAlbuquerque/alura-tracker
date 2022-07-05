<template>
  <section>
    <router-link to="/projects/new" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span> Novo Projeto </span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="remove(project.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { NotificationsType } from "@/interfaces/INotifications";
import useNotifier from "@/hooks/notifier";
import { DELETE_PROJECTS, GET_PROJECTS } from "@/store/types-actions";

export default defineComponent({
  name: "ListProjectView",
  methods: {
    remove(id: string) {
      this.store.dispatch(DELETE_PROJECTS, id);
      this.notifier(
        NotificationsType.FAILED,
        "Projeto Excluido!",
        "O projeto não está mais disponível"
      );
    },
  },
  setup() {
    const store = useStore();
    const { notifier } = useNotifier();
    store.dispatch(GET_PROJECTS);
    return {
      projects: computed(() => store.state.project.projects),
      store,
      notifier,
    };
  },
});
</script>