<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <div class="spinner" v-if="isLoading">
    <p>Your data is loading...</p>
    <div class="spinner__inner">
      <span class="spinner__line"></span>
      <span class="spinner__line"></span>
      <span class="spinner__line"></span>
    </div>
  </div>
</template>

<style scoped></style>
