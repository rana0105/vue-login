export const state = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
};

export const getters = {
  token: (state) => state.token,
  isLoggedIn(state) {
    if (state.token) {
      return true;
    }
    return false;
  },
  user: (state) => state.user,
  isUser(state) {
    if (state.user) {
      return state.user;
    }
    return false;
  },
};

export const actions = {
  setToken({ commit }, token) {
    localStorage.setItem("token", token);
    commit("SET_TOKEN", token);
  },
  setUser({ commit }, user) {
    localStorage.setItem("user", JSON.stringify(user));
    commit("SET_USER", user);
  },
  removeTokenUser({ commit }) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    commit("REMOVE_TOKEN_USER");
  },
};

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  REMOVE_TOKEN_USER(state) {
    state.token = null;
    state.user = null;
  },
};
