<script setup lang="ts">
import ICard from '@/components/I-card.vue';
import ISearch from '@/components/I-search.vue';
import ISorting from '@/components/I-sorting.vue';
import ISpinner from '@/components/I-spinner.vue';
import { filteredAndSorted } from '@/composable/post/filteredAndSorted';
import { API_URL, sortOptions } from '@/constants';
import { API } from '@/fetchApi';
import { IPost, IPostInfoProps, MethodEnum } from '@/types';
import { computed, ref } from 'vue';

const postsData = ref<IPost[]>([]);
const isLoading = ref(true);
const selectedSortVal = ref('');
const searchParam = ref('');
const componentName = ref('');
const isModalState = ref(false);
const currentPost = ref<IPost | undefined>(undefined);

const getPosts = () => {
  API.get(`${API_URL}/users`)
    .then(({ data: { data } }) => (postsData.value = data))
    .catch((e) => console.log(e))
    .finally(() => {
      isLoading.value = false;
    });
};
const sortedPosts = computed(() =>
  filteredAndSorted(postsData, selectedSortVal, searchParam)
);
const findCurrentPost = (id: number) =>
  postsData.value.find((post) => post.id === id);

const getCurrentPost = (id: number) =>
  (currentPost.value = findCurrentPost(id));

const deletePost = (id: number) => {
  API.delete(`${API_URL}/users/${id}`)
    .then((res) => {
      console.log(res);
      postsData.value = postsData.value.filter((el) => el.id !== id);
    })
    .catch((e) => console.log(e));
};

const removeModal = (state: boolean) => {
  isModalState.value = state;
  currentPost.value = undefined;
};

const getPostInfo = (props: IPostInfoProps) => {
  componentName.value = props.method;
  switch (props.method) {
    case MethodEnum.DELETE:
      deletePost(props.id);
      break;
    case MethodEnum.UPDATE:
      getCurrentPost(props.id);
      isModalState.value = true;
      break;
    case MethodEnum.SHOW_INFO:
      getCurrentPost(props.id);
      isModalState.value = true;
      break;
  }
};
getPosts();
</script>

<template>
  <div class="content">
    <div class="container">
      <div class="content__inner">
        <div class="content__top">
          <div class="content__top-inner">
            <i-sorting :options="sortOptions" v-model="selectedSortVal" />
            <i-search v-model="searchParam" />
          </div>
        </div>
        <i-spinner v-if="isLoading" :is-loading="isLoading" />
        <div v-else class="grid-col-4">
          <i-card
            v-for="post in sortedPosts"
            :key="post.id"
            :post="post"
            @getPostInfo="getPostInfo" />
        </div>
      </div>
    </div>
    <teleport to="body">
      <i-modal
        v-scroll-lock="isModalState"
        :modal-state="isModalState"
        @updateState="removeModal">
      </i-modal>
    </teleport>
  </div>
</template>
