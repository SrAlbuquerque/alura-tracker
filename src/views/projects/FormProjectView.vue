<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label for="projectName" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="projectName"
          id="projectName"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Enviar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { NotificationsType } from "@/interfaces/INotifications";

import useNotifier from "@/hooks/notifier";
import { POST_PROJECTS, PUT_PROJECTS } from "@/store/types-actions";

export default defineComponent({
  name: "FormProjectView",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.project.projects.find(
        (proj) => proj.id == this.id
      );
      this.projectName = project?.name || "";
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    save() {
      if (this.id) {
        this.store
          .dispatch(PUT_PROJECTS, {
            id: this.id,
            name: this.projectName,
          })
          .then(() => this.success());
      } else {
        this.store
          .dispatch(POST_PROJECTS, this.projectName)
          .then(() => this.success());
      }
    },
    success() {
      this.projectName = "";
      this.notifier(
        NotificationsType.SUCCESS,
        "Projeto Criado!",
        "Um novo projeto está disponível"
      );
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStore();
    const { notifier } = useNotifier();
    return {
      store,
      notifier,
    };
  },
});
</script>
