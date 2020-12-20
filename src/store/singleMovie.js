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
    async fetchSingleMovie({ state, commit }) {
      // Reset state
      commit("setSingleMovieDetails", {});

      const { selectedMovieId } = state;

      if (selectedMovieId) {
        commit("setLoading", true);
        commit("setError", undefined);
        try {
          const response = await httpMovieService.get(
            `${baseMovieApiUrl}?i=${selectedMovieId}`
          );

          const data = response.data;

          console.log("data", data);

          if (data.Response === "False") {
            throw new Error(data.Error);
          } else {
            commit("setSingleMovieDetails", data);
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
