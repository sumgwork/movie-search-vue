import { baseMovieApiUrl } from "../utils/baseUrl";
import httpMovieService from "../utils/httpMovieService";

export const movies = {
  namespaced: true,

  state() {
    return {
      searchResults: {},
      loading: false,
      error: null,
      page: 1,
      searchText: "",
    };
  },

  mutations: {
    setMovies(state, payload) {
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
  },

  actions: {
    async fetchMovies(ctx) {
      const { searchText, page } = ctx.state;
      if (searchText && searchText.length > 2) {
        ctx.commit("setLoading", true);
        try {
          const response = await httpMovieService.get(
            `${baseMovieApiUrl}?s=${searchText}&page=${page}`
          );

          const data = response.data;

          if (data.Response === "True") {
            ctx.commit("setMovies", data);
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
