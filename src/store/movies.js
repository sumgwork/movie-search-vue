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
    async fetchMovies(ctx) {
      ctx.commit("setSearchResults", {});
      const { searchText, currentPage } = ctx.state;
      if (searchText && searchText.length > 2) {
        ctx.commit("setLoading", true);
        ctx.commit("setError", undefined);
        try {
          const response = await httpMovieService.get(
            `${baseMovieApiUrl}?s=${searchText}&page=${currentPage}`
          );

          const data = response.data;

          if (data.Response === "True") {
            ctx.commit("setSearchResults", data);
          } else if (data.Response === "False") {
            throw new Error(data.Error);
          }
        } catch (error) {
          ctx.commit("setError", error);
        } finally {
          ctx.commit("setLoading", false);
        }
      }
    },
  },
};
