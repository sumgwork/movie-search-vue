<template>
  <div class="body">
    <div class="sidebar box-padding">
      <slot name="sidebar" />
    </div>

    <div class="mainContent box-padding">
      <slot name="mainContent" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.body {
  height: 100vh;
  display: flex;
}

.sidebar {
  width: var(--sidebar-width);
  border-right: 2px solid var(--grey);
}

.mainContent {
  width: 100%;
}
</style>
