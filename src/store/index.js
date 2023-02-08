import axios from "axios";
import { createStore } from "vuex";

let timer;

export default createStore({
  state: {
    email: null,
    token: null,
    userId: null,
    username: null,
    movies: [],
    reviews: [],
  },
  getters: {
    email(state) {
      return state.email;
    },
    token(state) {
      return state.token;
    },
    userId(state) {
      return state.userId;
    },
    isAuthenticated(state) {
      return state.token !== null || localStorage.getItem("token") != null;
    },
    getMovies(state) {
      return state.movies;
    },
    getReviews(state) {
      return state.reviews;
    },
    isAdmin(state) {
      return (
        state.email === "ionela@email.com" ||
        localStorage.getItem("email") === "ionela@email.com"
      );
    },
    username(state) {
      return state.username;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.email = payload.email;
      state.token = payload.token;
      state.userId = payload.userId;
      state.username = payload.username;
    },
    setMovies(state, payload) {
      state.movies = payload;
    },
    setReviews(state, payload) {
      state.reviews = payload;
    },
  },
  actions: {
    login: ({ commit, dispatch }, responseData) => {
      const expiresIn = +responseData.expiresIn * 1000;

      localStorage.setItem("email", responseData.email);
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("username", responseData.username);

      timer = setTimeout(function () {
        dispatch("logout");
      }, expiresIn); //se face logout automat

      commit("setUser", {
        email: responseData.email,
        token: responseData.idToken,
        userId: responseData.localId,
        username: responseData.username,
      });
    },
    logout({ commit }) {
      localStorage.removeItem("email"); //se elibereaza localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      clearTimeout(timer); //se sterge timerul

      commit("setUser", {
        email: null,
        token: null,
        userId: null,
        username: null,
      });
    },
    async loadMovies({ commit }) {
      const movies = await axios.get(`${process.env.VUE_APP_API_URL}/movies`);
      commit("setMovies", movies?.data || {});
    },
    async loadMovie(_, id) {
      //n-am nevoie de primul param
      const movie = await axios.get(
        `${process.env.VUE_APP_API_URL}/movies/${id}`
      );
      return movie?.data || {};
    },
    async deleteMovie({ commit }, id) {
      await axios.delete(`${process.env.VUE_APP_API_URL}/admin/movies/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const movies = await axios.get(`${process.env.VUE_APP_API_URL}/movies`);
      commit("setMovies", movies?.data || {});
    },
    async deleteReview({ commit }, { id: movieId, reviewId }) {
      await axios.delete(
        `${process.env.VUE_APP_API_URL}/admin/movies/${movieId}/reviews/${reviewId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const reviews = await axios.get(`${process.env.VUE_APP_API_URL}/reviews`);
      commit("setReviews", reviews?.data || {});
    },
    async loadReviews({ commit }) {
      const reviews = await axios.get(
        `${process.env.VUE_APP_API_URL}/admin/reviewsFilter`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      commit("setReviews", reviews?.data || []);
    },
  },
  modules: {},
});
