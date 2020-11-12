<template>
  <aside>
    <input
      name="searchText"
      placeholder="Start Search ..."
      @input="onInputChange"
    />
    <div class="resultPane">
      <search-results />
    </div>
    <pagination />
  </aside>
</template>

<script>
import Pagination from "./Pagination.vue";
import SearchResults from "./SearchResults.vue";
import { useStore } from "vuex";
import debounce from "lodash.debounce";

export default {
  name: "Sidebar",
  components: {
    Pagination,
    SearchResults,
  },
  setup() {
    const store = useStore();
    const onInputChange = debounce((event) => {
      store.commit("movies/setSearchText", event.target.value);
      store.dispatch("movies/fetchMovies");
    }, 400);

    return {
      onInputChange,
    };
  },
};
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  border: 1px solid var(--grey);
  padding: 0.5rem 1rem;
  overflow: auto;
}

input {
  width: 100%;
  height: 48px;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.resultPane {
  height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
