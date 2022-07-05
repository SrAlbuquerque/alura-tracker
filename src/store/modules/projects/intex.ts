import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import {
  GET_PROJECTS,
  POST_PROJECTS,
  PUT_PROJECTS,
  DELETE_PROJECTS,
} from "@/store/types-actions";
import {
  ADD_PROJECT,
  EDIT_PROJECT,
  REMOVE_PROJECT,
  DEFINE_PROJECT,
} from "@/store/types-mutations";
import { Module } from "vuex";

export interface ProjectState {
  projects: IProject[];
}

export const project: Module<ProjectState, State> = {
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;
      state.projects.push(project);
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((proj) => proj.id == project.id);
      state.projects[index] = project;
    },
    [REMOVE_PROJECT](state, id: string) {
      state.projects = state.projects.filter((proj) => proj.id != id);
    },
    [DEFINE_PROJECT](state, projects: IProject[]) {
      state.projects = projects;
    },
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      http
        .get("tasks")
        .then((response) => commit(DEFINE_PROJECT, response.data));
    },
    [POST_PROJECTS](context, projectName: string) {
      return http.post("/projects", {
        name: projectName,
      });
    },
    [PUT_PROJECTS](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [DELETE_PROJECTS]({ commit }, id: string) {
      return http
        .delete(`/projects/${id}`)
        .then(() => commit(REMOVE_PROJECT, id));
    },
  },
};
