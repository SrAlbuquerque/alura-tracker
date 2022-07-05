<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': activeDarkMode }"
  >
    <div class="column is-one-quarter">
      <SideBarComponent @onSwitchedTheme="switchTheme" />
    </div>
    <div class="column is-three-quarter content">
      <NotificationsComponent />

      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBarComponent from "./components/SideBarComponent.vue";
import NotificationsComponent from "./components/NotificationsComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBarComponent,
    NotificationsComponent,
  },

  data() {
    return {
      activeDarkMode: false,
    };
  },

  methods: {
    switchTheme(activeDarkMode: boolean) {
      this.activeDarkMode = activeDarkMode;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --primary-bg: #fff;
  --primary-text: #000;
}
main.dark-mode {
  --primary-bg: #2b2d42;
  --primary-text: #ddd;
}

.content {
  background-color: var(--primary-bg);
}
</style>
