<script setup lang="ts"></script>

<template>
  <div class="search">
    <label class="form-field">
      <input
        name="search"
        class="form-input"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Search"
        type="search" />
    </label>
  </div>
</template>
