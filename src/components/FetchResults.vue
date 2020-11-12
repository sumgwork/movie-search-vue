<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <slot name="result" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
    loading: {
      type: Boolean,
    },
    error: {
      type: Error,
    },
  },
};
</script>

<style scoped></style>
