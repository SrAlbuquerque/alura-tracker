import http from "@/http";
import { INotifications } from "@/interfaces/INotifications";
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { project, ProjectState } from "./modules/projects/intex";
import { GET_TASKS, POST_TASKS, PUT_TASKS } from "./types-actions";
import { ADD_TASKS, DEFINE_TASKS, EDIT_TASKS, NOTIFY } from "./types-mutations";

export interface State {
  notifications: INotifications[];
  tasks: ITask[];
  project: ProjectState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notifications: [],
    tasks: [],
    project: {
      projects: [],
    },
  },
  mutations: {
    [DEFINE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },
    [ADD_TASKS](state, task: ITask) {
      state.tasks.push(task);
    },
    [EDIT_TASKS](state, task: ITask) {
      const index = state.tasks.findIndex((t) => t.id == task.id);
      state.tasks[index] = task;
    },
    [NOTIFY](state, newNotification: INotifications) {
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (notifications) => notifications.id != newNotification.id
        );
      }, 3000);
    },
  },

  actions: {
    [GET_TASKS]({ commit }) {
      http.get("tasks").then((response) => commit(DEFINE_TASKS, response.data));
    },
    [POST_TASKS]({ commit }, task: ITask) {
      return http
        .post("/tasks", task)
        .then((reponse) => commit(ADD_TASKS, reponse.data));
    },
    [PUT_TASKS]({ commit }, task: ITask) {
      return http
        .put(`/tasks/${task.id}`, task)
        .then(() => commit(EDIT_TASKS, task));
    },
  },

  modules: {
    project,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
