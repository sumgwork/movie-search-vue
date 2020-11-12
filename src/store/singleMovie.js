export const singleMovie = {
  namespaced: true,

  state() {
    return {
      selectedMovieId: null,
    };
  },

  mutations: {
    setSelectedMovieId(state, payload) {
      state.selectedMovieId = payload;
    },
  },

  actions: {},
};
