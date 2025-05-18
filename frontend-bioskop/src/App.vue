<script setup lang="ts">
import { RouterView } from 'vue-router';
const year = new Date().getFullYear()

</script>

<template>

  <div class="container">
    <RouterView />
    <p class="text-center mt-3">&copy {{ year }} Singidunum University</p>
  </div>

</template>

