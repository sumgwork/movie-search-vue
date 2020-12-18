import { baseMovieApiUrl } from "../utils/config";
import httpMovieService from "../utils/httpMovieService";

export const movies = {
  namespaced: true,

  state() {
    return {
      searchResults: {},
      loading: false,
      error: undefined,
      currentPage: 1,
      searchText: "",
    };
  },

  mutations: {
    setSearchResults(state, payload) {
      state.searchResults = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setSearchText(state, payload) {
      state.searchText = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },

  actions: {
    async fetchMovies({ state, commit }) {
      commit("setSearchResults", {});
      const { searchText, currentPage } = state;
      if (searchText && searchText.length > 2) {
        commit("setLoading", true);
        commit("setError", undefined);
        try {
          const response = await httpMovieService.get(
            `${baseMovieApiUrl}?s=${searchText}&page=${currentPage}`
          );

          const data = response.data;

          if (data.Response === "True") {
            commit("setSearchResults", data);
          } else if (data.Response === "False") {
            throw new Error(data.Error);
          }
        } catch (error) {
          commit("setError", error);
        } finally {
          commit("setLoading", false);
        }
      }
    },
  },
};
