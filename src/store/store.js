import { createStore } from "vuex";
import { movies } from "./movies";
import { singleMovie } from "./singleMovie";

export const store = createStore({
  modules: {
    movies,
    singleMovie,
  },
});
