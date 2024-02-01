<script setup lang="ts">
import ICard from '@/components/I-card.vue';
import IDetails from '@/components/I-details.vue';
import IModal from '@/components/I-modal.vue';
import ISearch from '@/components/I-search.vue';
import ISorting from '@/components/I-sorting.vue';
import ISpinner from '@/components/I-spinner.vue';
import IUpdatePost from '@/components/I-update-post.vue';
import { filteredArray } from '@/composable/post/filter';
import { IErrors, validate } from '@/composable/post/validate';
import { API_URL, sortOptions } from '@/constants';
import { API } from '@/fetchApi';
import { ICreatePost, IPost, IPostInfoProps, MethodEnum } from '@/types';
import { clearFormData } from '@/utils';
import { computed, reactive, ref, shallowRef } from 'vue';

const postsData = ref<IPost[]>([]);
const isLoading = ref(true);
const selectedSortVal = ref('');
const searchParam = ref('');
const componentName = ref('');
const isModalState = ref(false);
const currentPost = ref<IPost | undefined>(undefined);
const isDisabled = ref(false);
const formData = reactive<ICreatePost>({
  name: '',
  email: '',
});
const validationErrors = ref<IErrors | null>(null);

const getPosts = () => {
  API.get(`${API_URL}/users`)
    .then(({ data: { data } }) => (postsData.value = data))
    .catch((e) => console.log(e))
    .finally(() => {
      isLoading.value = false;
    });
};
const searchByKeys = ['first_name', 'last_name', 'email'];
const sortedPosts = computed(() =>
  filteredArray(
    postsData.value,
    selectedSortVal.value,
    searchParam.value,
    searchByKeys
  )
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
const updatePost = (data: IPost) => {
  postsData.value = postsData.value.map((obj) =>
    obj.id === data.id ? { ...data } : obj
  );
};
const createPost = () => {
  validationErrors.value = validate(formData);

  if (!Object.keys(validationErrors.value).length) {
    isDisabled.value = true;
    API.post(`${API_URL}/users`, formData)
      .then((res) => {
        const { id, name, email } = res.data;
        postsData.value.push({
          id: id,
          avatar: 'https://reqres.in/img/faces/4-image.jpg',
          first_name: name,
          last_name: '',
          email: email,
          phone: '',
          address: '',
        });
        clearFormData(formData);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        isDisabled.value = false;
      });
  }
};

const removeModal = (state: boolean) => {
  isModalState.value = state;
  currentPost.value = undefined;
};
const dynamicComponents = reactive({
  'show-info': {
    components: shallowRef(IDetails),
    props: { post: currentPost },
    event: {},
  },
  update: {
    components: shallowRef(IUpdatePost),
    props: { post: currentPost },
    event: {
      name: 'updatePost',
      method: updatePost,
    },
  },
});
const getComponent = computed(() => dynamicComponents[componentName.value]);
const postAction = (props: IPostInfoProps) => {
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
          <form @submit.prevent="createPost" class="form" novalidate>
            <div class="form-field">
              <label class="form-label" data-required for="user-name"
                >User Name</label
              >
              <input
                name="name"
                id="user-name"
                :class="validationErrors?.name?.invalid ? 'field-error' : null"
                v-model="formData.name"
                class="form-input"
                type="text"
                placeholder="Name" />
              <span
                v-if="validationErrors?.name?.invalid"
                class="form-error-message">
                {{ validationErrors?.name?.message }}
              </span>
            </div>
            <div class="form-field">
              <label data-required class="form-label" for="user-email"
                >User Email</label
              >
              <input
                name="email"
                id="user-email"
                :class="validationErrors?.email?.invalid ? 'field-error' : null"
                v-model="formData.email"
                class="form-input"
                type="email"
                placeholder="Email" />
              <span
                v-if="validationErrors?.email?.invalid"
                class="form-error-message">
                {{ validationErrors?.email?.message }}
              </span>
            </div>
            <button
              :disabled="isDisabled"
              type="submit"
              class="btn btn--submit">
              Create
            </button>
          </form>
          <div class="content__top-inner">
            <i-sorting :options="sortOptions" v-model="selectedSortVal" />
            <i-search v-model="searchParam" />
          </div>
        </div>
        <i-spinner v-if="isLoading" :is-loading="isLoading" />
        <div v-else class="grid-col-4">
          <div v-if="!sortedPosts.length">Oops...</div>
          <i-card
            v-for="post in sortedPosts"
            :key="post.id"
            :post="post"
            @post-action="postAction" />
        </div>
      </div>
    </div>
    <teleport to="body">
      <i-modal
        v-scroll-lock="isModalState"
        :modal-state="isModalState"
        @updateState="removeModal">
        <component
          v-if="componentName !== ''"
          :is="getComponent.components"
          v-bind="{ ...getComponent.props }"
          @[getComponent.event.name]="getComponent.event.method" />
      </i-modal>
    </teleport>
  </div>
</template>
