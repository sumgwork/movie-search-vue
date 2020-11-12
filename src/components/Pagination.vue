<template>
  <div v-if="numPages > 1 && !!total" class="center pagination">
    <button @click="handleToPrevPage" :disabled="currentPage === 1">⬅️</button>
    <div v-if="total">
      <div>Page {{ currentPage }}</div>
      <div>{{ total }} Results</div>
    </div>
    <button @click="handleToNextPage" :disabled="currentPage === numPages">
      ➡️
    </button>
  </div>
</template>

<script>
import { pageSize } from "../utils/config";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const total =
      computed(() => store.state.movies.searchResults.totalResults) || 0;
    const numPages = computed(() =>
      total.value ? Math.ceil(total.value / pageSize) : 0
    );

    const currentPage = computed(() => store.state.movies.currentPage) || 1;

    const handleToPrevPage = () => {
      store.commit("movies/setCurrentPage", currentPage.value - 1);
      store.commit("singleMovie/setSelectedMovieId", null);
      store.dispatch("movies/fetchMovies");
    };
    const handleToNextPage = () => {
      store.commit("movies/setCurrentPage", currentPage.value + 1);
      store.commit("singleMovie/setSelectedMovieId", null);
      store.dispatch("movies/fetchMovies");
    };

    return { numPages, total, handleToPrevPage, handleToNextPage, currentPage };
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
}

button {
  background: none;
  border: none;
  font-size: 2.5rem;
  outline: none;
  cursor: pointer;
}

button[disabled] {
  visibility: hidden;
}
</style>
