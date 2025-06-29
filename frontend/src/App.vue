<template>
  <div>
    <nav>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/logs">Logs</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>
