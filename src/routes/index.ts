import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksView from "../views/TasksView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import FormProjectView from "../views/projects/FormProjectView.vue";
import ListProjectView from "../views/projects/ListProjectView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tasks",
    component: TasksView,
  },
  {
    path: "/projects",
    component: ProjectsView,
    children: [
      {
        path: "",
        name: "Projects",
        component: ListProjectView,
      },
      {
        path: "new",
        name: "New projects",
        component: FormProjectView,
      },
      {
        path: ":id",
        name: "Edit projects",
        component: FormProjectView,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
