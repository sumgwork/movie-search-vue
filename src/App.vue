<template>
  <layout>
    <template v-slot:sidebar>
      <sidebar />
    </template>
    <template v-slot:mainContent>
      Content
    </template>
  </layout>
</template>

<script>
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: { Layout, Sidebar },
};
</script>

<style>
/* global styles */
:root {
  --sidebar-width: 600px;
  --grey: #a2b9bc;
  --black: #0e0e0e;
}
* {
  box-sizing: border-box;
}
html {
  font-size: 10px;
  background: #d5e1df;
}
body {
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
  max-width: 1200px;
  background: white;
}

.box-padding {
  padding: 1.5rem;
}
</style>
