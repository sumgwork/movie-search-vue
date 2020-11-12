<template>
  <fetch-results :loading="loading" :error="error">
    <template v-slot:result>
      <div class="contentStyles" v-if="movie">
        <div v-if="movie">
          <h1 class="movieTitle">{{ movie.Title }}</h1>
          <sub class="movieGenre">{{ movie.Genre }}</sub>
          <p class="moviePlot">{{ movie.Plot }}</p>
          <p class="property">
            <span class="propertyName">Actors:</span> {{ movie.Actors }}
          </p>
          <p class="property">
            <span class="propertyName">Director:</span> {{ movie.Director }}
          </p>
          <p class="property">
            <span class="propertyName">Runtime:</span> {{ movie.Runtime }}
          </p>
          <p class="property">
            <span class="propertyName">Language:</span> {{ movie.Language }}
          </p>
        </div>
        <div class="imageWrapper">
          <img :src="movie.Poster" :alt="movie.Title" />
        </div>
      </div>
    </template>
  </fetch-results>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import FetchResults from "./FetchResults.vue";

export default {
  components: {
    FetchResults,
  },
  setup() {
    const store = useStore();
    const movie = computed(() => store.state.singleMovie.singleMovieDetails);
    const loading = computed(() => store.state.singleMovie.loading);
    const error = computed(() => store.state.singleMovie.error);

    return { movie, loading, error };
  },
};
</script>

<style scoped>
.contentStyles {
  height: 100vh;
  overflow-y: auto;
  border: 1px solid var(--grey);
  border-left: none;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  --marginBottom: 1.5rem;
}

.movieTitle {
  margin-bottom: var(--marginBottom);
}

.movieGenre {
  display: block;
  margin-bottom: var(--marginBottom);
  font-size: 1.4rem;
}
.moviePlot {
  margin-bottom: var(--marginBottom);
  font-size: 1.6rem;
}

.imageWrapper {
  width: 600px;
  height: 400px;
  margin-left: 2rem;
  overflow: none;
}

img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.property {
  font-size: 1.5rem;
  line-height: 1.5;
}

.propertyName {
  font-weight: 700;
}
</style>
