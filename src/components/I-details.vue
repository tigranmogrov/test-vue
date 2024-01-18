<script setup lang="ts">
import { IPost } from '@/types';

defineProps<{
  post: IPost | undefined;
}>();
</script>

<template>
  <div v-if="post" class="details">
    <div class="details__inner">
      <span class="details__avatar">
        <img :src="post.avatar" :alt="post.first_name" />
      </span>
      <dl class="details__list">
        <dt class="details__term">First Name:</dt>
        <dd class="details__desc">{{ post.first_name }}</dd>
        <dt class="details__term">Last Name:</dt>
        <dd class="details__desc">{{ post.last_name }}</dd>
        <dt class="details__term">Email:</dt>
        <dd class="details__desc">{{ post.email }}</dd>
        <dt class="details__term">Phone:</dt>
        <dd class="details__desc">{{ post.phone || '---' }}</dd>
        <dt class="details__term">Address:</dt>
        <dd class="details__desc">{{ post.address || '---' }}</dd>
      </dl>
    </div>
  </div>
</template>
