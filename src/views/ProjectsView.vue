<template>
  <div class="projects">
    <h1 class="title">Projetos</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsView",
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>