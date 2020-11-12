import { baseMovieApiUrl } from "../utils/config";
import httpMovieService from "../utils/httpMovieService";

export const singleMovie = {
  namespaced: true,

  state() {
    return {
      selectedMovieId: null,
      singleMovieDetails: {},
      loading: false,
      error: undefined,
    };
  },

  mutations: {
    setSelectedMovieId(state, payload) {
      state.selectedMovieId = payload;
    },
    setSingleMovieDetails(state, payload) {
      state.singleMovieDetails = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },

  actions: {
    async fetchSingleMovie(ctx) {
      // Reset state
      ctx.commit("setSingleMovieDetails", {});

      const { selectedMovieId } = ctx.state;

      if (selectedMovieId) {
        ctx.commit("setLoading", true);
        ctx.commit("setError", undefined);
        try {
          const response = await httpMovieService.get(
            `${baseMovieApiUrl}?i=${selectedMovieId}`
          );

          const data = response.data;

          console.log("data", data);

          if (data.Response === "False") {
            throw new Error(data.Error);
          } else {
            ctx.commit("setSingleMovieDetails", data);
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
