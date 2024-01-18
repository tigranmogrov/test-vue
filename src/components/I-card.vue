<script setup lang="ts">
import { IPost, IPostInfoProps } from '@/types';

defineProps<{
  post: IPost;
}>();
</script>

<template>
  <div class="card">
    <img class="card__avatar" :src="post.avatar" :alt="post.first_name" />
    <div class="card__body">
      <button
        @click="
          $emit('getPostInfo', {
            id: post.id,
            method: 'show-info',
          } as IPostInfoProps)
        "
        class="card__title">
        {{ post.first_name }} {{ post.last_name }}
      </button>
      <a class="card__email-link" :href="'mailto:' + post.email">{{
        post.email
      }}</a>
      <button
        @click="
          $emit('getPostInfo', {
            id: post.id,
            method: 'delete',
          } as IPostInfoProps)
        "
        class="btn card__button">
        Delete
      </button>

      <button
        @click="
          $emit('getPostInfo', {
            id: post.id,
            method: 'update',
          } as IPostInfoProps)
        "
        class="btn card__button">
        Update
      </button>
    </div>
  </div>
</template>
