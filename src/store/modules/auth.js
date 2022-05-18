/* eslint-disable no-unused-vars */
import apiCaller from "@/utils/api";
import AuthToken from "@/utils/token";
import AuthRole from "@/utils/role";

const state = {
  exampleState: "example",
  exampleData: null,
  loading: false,
  auth: null,
  token: "",
  role: "",
};

const getters = {
  GET_EXAMPLE_STATE: (state) => state.exampleState,
  token: (state) => state.token,
  auth: (state) => state.auth,
  role: (state) => state.role,
};

const mutations = {
  SET_EXAMPLE_STATE: (state, status) => {
    state.exampleState = status;
  },
  SET_DEMO: (state, data) => {
    state.exampleData = data;
  },

  setToken(state, token) {
    state.token = token;
  },
  removeToken(state) {
    state.token = null;
  },
  setAuth(state, auth) {
    state.auth = auth;
  },
  setRole(state, role) {
    state.role = role;
  },
};

const actions = {
  GET_EDIT_ALGORITHM_QUESTION: ({ commit }, questionId) => {
    return new Promise((resolve, reject) => {
      apiCaller.getRequest(
        `/api/algorithmQuestion/${questionId}/edit`,
        null,
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  UPDATE_ALGORITHM_QUESTION: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      apiCaller.putRequest(
        `/api/algorithmQuestion/${payload.questionId}`,
        payload.data,
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  CREATE_ALGORITHM_QUESTION: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      apiCaller.postRequest(
        "/api/algorithmQuestion",
        payload.data,
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  GENERATE_EXAM: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      apiCaller.getRequest(
        "/api/algorithmQuestion/random",
        payload,
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  GET_DETAIL_CANDIDATE: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      apiCaller.getRequest(
        `/api/candidates/${payload.id}`,
        null,
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  getAuth({ commit }) {
    return new Promise((resolve, reject) => {
      apiCaller.getRequest(
        "/api/auth",
        "",
        (response) => {
          commit("setAuth", response.data.data);
          commit("setRole", response.data.data.role);
          AuthRole.setRole(response.data.data.role);
          resolve(response.data);
        },
        (err) => {
          AuthToken.removeToken();
          AuthRole.removeRole();
          reject(err.response.data);
        }
      );
    });
  },

  login({ commit }, credential) {
    return new Promise((resolve, reject) => {
      apiCaller.postRequest(
        "/api/login",
        credential,
        (response) => {
          commit("setToken", response.data.data.access_token);
          AuthToken.setToken(response.data.data.access_token);
          resolve(response);
        },
        (err) => {
          reject(err.response.data);
        }
      );
    });
  },

  logout({ commit }) {
    return new Promise((resolve) => {
      commit("removeToken");
      AuthToken.removeToken();
      resolve();
    });
  },

  changePassword({ commit }, credential) {
    return new Promise((resolve, reject) => {
      apiCaller.postRequest(
        "/api/changePassword",
        credential,
        (response) => {
          commit("setToken", response.data.data.access_token);
          AuthToken.setToken(response.data.data.access_token);
          resolve(response);
          resolve(response);
        },
        (err) => {
          reject(err.response.data);
        }
      );
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
