<template>
  <div class="notifications">
    <article
      class="message"
      :class="context[notification.type]"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <div class="message-header">{{ notification.title }}</div>
      <div class="message-body">{{ notification.text }}</div>
    </article>
  </div>
</template>

<script>
import { NotificationsType } from "@/interfaces/INotifications";
import { useStore } from "@/store";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "NotificationsComponent",

  data() {
    return {
      context: {
        [NotificationsType.SUCCESS]: "is-success",
        [NotificationsType.WARNING]: "is-warning",
        [NotificationsType.FAILED]: "is-danger",
      },
    };
  },

  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>