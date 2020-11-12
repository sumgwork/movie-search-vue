<template>
  <fetch-results :loading="loading" :error="error">
    <template v-slot:result>
      <ul class="movieList">
        <li
          v-for="movie in movies.Search"
          :key="movie.imdbID"
          class="movieItem"
          :aria-selected="true"
          @click="onSelected(movie.imdbID)"
        >
          <h3>{{ movie.Title }}</h3>
          <div v-if="selectedMovieId === movie.imdbID" class="icon">⭐</div>
          <sub>{{ movie.Year }}</sub>
        </li>
      </ul>
    </template>
  </fetch-results>
</template>

<script>
import FetchResults from "./FetchResults.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {
    FetchResults,
  },
  setup() {
    const store = useStore();

    const porpertySelector = (module, property) => {
      return computed(() => store.state[module][property]);
    };

    const movies = porpertySelector("movies", "searchResults");
    const loading = porpertySelector("movies", "loading");
    const error = porpertySelector("movies", "error");

    const onSelected = (id) => {
      store.commit("singleMovie/setSelectedMovieId", id);
    };

    const selectedMovieId = computed(
      () => store.state.singleMovie.selectedMovieId
    );

    return { movies, loading, error, onSelected, selectedMovieId };
  },
};
</script>

<style scoped>
.movieList {
  list-style: none;
  margin-right: 1.5rem;
}

.movieItem {
  position: relative;
  margin: 1rem 0;
  border: 1px solid var(--black);
  cursor: pointer;
  padding: 1rem;
}

.movieItem:hover {
  background: var(--grey);
}
sub {
  text-align: right;
  display: block;
}
.icon {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
</style>
