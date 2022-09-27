import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "@/router"; // our vue router instance

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    refresh_token: "",
    access_token: "",
    loggedInUser: {},
    isAuthenticated: false,
  },
  mutations: {
    setRefreshToken: function (state, refreshToken) {
      state.refresh_token = refreshToken;
    },
    setAccessToken: function (state, accessToken) {
      state.access_token = accessToken;
    },
    // sets state with user information and toggles
    // isAuthenticated from false to true
    setLoggedInUser: function (state, user) {
      state.loggedInUser = user;
      state.isAuthenticated = true;
    },
    // delete all auth and user information from the state
    clearUserData: function (state) {
      state.refresh_token = "";
      state.access_token = "";
      state.loggedInUser = {};
      state.isAuthenticated = false;
    },
  },
  actions: {
    logIn: async ({ commit, dispatch }, payload) => {
      const loginUrl = "v1/auth/jwt/create/";
      try {
        await axios.post(loginUrl, payload).then((response) => {
          if (response.status === 200) {
            commit("setRefreshToken", response.data.refresh);
            commit("setAccessToken", response.data.access);
            dispatch("fetchUser");
            // redirect to the home page
            router.push({ name: "home" });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    refreshToken: async ({ state, commit }) => {
      const refreshUrl = "v1/auth/jwt/refresh/";
      try {
        await axios
          .post(refreshUrl, { refresh: state.refresh_token })
          .then((response) => {
            if (response.status === 200) {
              commit("setAccessToken", response.data.access);
            }
          });
      } catch (e) {
        console.log(e.response);
      }
    },
    fetchUser: async ({ commit }) => {
      const currentUserUrl = "v1/auth/users/me/";
      try {
        await axios.get(currentUserUrl).then((response) => {
          if (response.status === 200) {
            commit("setLoggedInUser", response.data);
          }
        });
      } catch (e) {
        console.log(e.response);
      }
    },
  },
  getters: {
    loggedInUser: (state) => state.loggedInUser,
    isAuthenticated: (state) => state.isAuthenticated,
    accessToken: (state) => state.access_token,
    refreshToken: (state) => state.refresh_token,
  },
});
