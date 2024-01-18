<script setup lang="ts">
defineProps<{
  modalState: boolean;
}>();
</script>

<template>
  <div
    @click.self="$emit('updateState', false)"
    v-if="modalState"
    class="modal">
    <div class="modal__inner">
      <button
        @click="$emit('updateState', false)"
        class="modal__close-btn"
        title="close modal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          height="490px"
          width="490px"
          viewBox="0 0 490 490"
          xml:space="preserve">
          <polygon
            points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
        </svg>
      </button>
      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
