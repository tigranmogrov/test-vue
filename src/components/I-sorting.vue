<script setup lang="ts">
import { ISort } from '@/types';

defineProps<{
  options: ISort[];
}>();
</script>

<template>
  <div class="sorting">
    <label class="form-field">
      <select
        name="sort"
        class="form-select"
        @change="$emit('update:modelValue', $event.target.value)">
        <option disabled selected value="">Choose</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </label>
  </div>
</template>
