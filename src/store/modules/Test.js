import apiCaller from "@/utils/api";

const state = {
  test: 1,
};

const getters = {
  GET_TEST_STATE: (state) => state.test,
};

const mutations = {
  setTest(state, value) {
    state.test = value;
  },
};

const actions = {
  TEST_ACTION: ({ commit }) => {
    return new Promise((resolve, reject) => {
      apiCaller.getRequest(
        `/api/admin/index`,
        null,
        (res) => {
          resolve(res);
          commit("setTest");
        },
        (err) => {
          reject(err);
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
